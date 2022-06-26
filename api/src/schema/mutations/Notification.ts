const { v4: uuid } = require("uuid");
import { GraphQLList, GraphQLString } from "graphql";
import { MessageType } from "../typedefs/Message";
import { Notification } from "../../entities/Notification";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import { NotificationType } from "../typedefs/Notification";
export const CREATE_NOTIFICATION = {
    type: NotificationType,
    args: {
        projectId: { type: GraphQLString },
        content: { type: GraphQLString },
        emitterId: { type: GraphQLString },
        redirect: { type: GraphQLString },
        receivers: { type: new GraphQLList(GraphQLString) },
        message: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        let { projectId, content, emitterId, receivers, redirect, message } = args
        const newuuid = uuid()

        if (context.user.id !== emitterId) throw new Error("The user who made the request is not the same as the one in the context.");
        const emitter = await User.findOne({ where: { id: context.user.id }, relations: ["notificationsEmitted"] })
        if (!emitter) throw new Error("Cannot find emitter.")
        const project = await Project.findOne({ where: { id: projectId }, relations: ["contributors"] })
        if (!project) throw new Error("Cannot find project.")
        if (!receivers) receivers = project.contributors.map(contrib => contrib.id);
        const notification = Notification.create({ seen: false, id: newuuid, message: message, content: content, emitter: emitter, redirect: redirect, creation: new Date().toString() })
        emitter.notificationsEmitted.push(notification)
        await Notification.save(notification)

        receivers.forEach(async (receiver: string) => {
            const user = await User.findOne({ where: { id: receiver }, relations: ["notifications"] })
            if (user) {
                user.notifications.push(notification)
                if (user.notifications.length >= 5) user.notifications.slice(0, 1)
                context.pubsub.publish(user.id, { notification });
                await User.save(user)
            }
        })

        return notification
    }

}
export const READ_NOTIFICATION = {
    type: MessageType,
    args: {
        notificationId: { type: GraphQLString },
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { userId, notificationId } = args
        const user = await User.findOne({ where: { id: userId }, relations: ["notifications", 'notifications.emitter'] })
        if (!user) throw new Error("Cannot find user.")
        const notification = await Notification.findOne({ id: notificationId })
        if (!notification) throw new Error("Cannot find notification.")
        notification.seen = true
        await Notification.save(notification)

    }
}
