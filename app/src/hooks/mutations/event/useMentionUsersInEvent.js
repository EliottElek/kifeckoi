import { useMutation } from "@apollo/client";
import { MENTION_USERS_IN_EVENT } from "../../../graphql/mutations";

const useMentionUsersInEvent = (variables) => {
  const [mentionUsersInEvent] = useMutation(MENTION_USERS_IN_EVENT, {
    variables: variables,
  });
  return mentionUsersInEvent;
};
export default useMentionUsersInEvent;
