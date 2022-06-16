import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../../../graphql/mutations";

const useCreateEvent = (variables) => {
  const [createEvent] = useMutation(CREATE_EVENT, {
    variables: variables,
  });
  return createEvent;
};
export default useCreateEvent;
