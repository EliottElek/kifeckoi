import { useMutation } from "@apollo/client";
import { RENAME_EVENTS_STATUS } from "../../../../graphql/mutations";

const useRenameEventsStatus = (variables) => {
  const [renameEventsStatus] = useMutation(RENAME_EVENTS_STATUS, {
    variables: variables,
  });
  return renameEventsStatus;
};
export default useRenameEventsStatus;
