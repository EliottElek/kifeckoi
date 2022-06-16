import { useMutation } from "@apollo/client";
import { DELETE_MULTIPLE_EVENTS } from "../../../graphql/mutations";

const useDeleteMultipleEvents = (variables) => {
  const [deleteEvent] = useMutation(DELETE_MULTIPLE_EVENTS, {
    variables: variables,
  });
  return deleteEvent;
};
export default useDeleteMultipleEvents;
