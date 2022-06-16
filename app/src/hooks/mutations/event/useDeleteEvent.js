import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "../../../graphql/mutations";

const useDeleteEvent = (variables) => {
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    variables: variables,
  });
  return deleteEvent;
};
export default useDeleteEvent;
