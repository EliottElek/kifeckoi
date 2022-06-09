const { v4: uuid } = require("uuid");
import { Project } from '../entities/Project'
import { Event } from '../entities/Event'

const insertEventRow = async (row: { type: any; id: any; description: any; contributors: any; status: any; creatorId: any; period: any; }, projectId: string) => {
    let { type, description, status, period, id } = row
    const newuuid = uuid()
    const project = await Project.findOne({ id: projectId })
    const creationDate = new Date();

    if (!project) {
        return { success: false, id: id, description: description }
    } else {
        const newEvent = Event.create({ type: type, id: newuuid, projectId: projectId, contributors: [], project: project, description: JSON.stringify(description), status: status, creation: creationDate.toString(), period: period, state: "" })
        await Event.save(newEvent)
        await Project.save(project)
        console.log(newEvent)
    }
    return null
}
export default insertEventRow