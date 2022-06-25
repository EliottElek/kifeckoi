import { useMutation } from "@apollo/client";
import { DELETE_EVENTS_STATUS } from "../../../../graphql/mutations";

const useDeleteEventsStatus = (variables) => {
  const [deleteEventsStatus] = useMutation(DELETE_EVENTS_STATUS, {
    variables: variables,
  });
  return deleteEventsStatus;
};
export default useDeleteEventsStatus;
