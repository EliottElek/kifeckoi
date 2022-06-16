import { useMutation } from "@apollo/client";
import { CHANGE_EVENT_STATE } from "../../../graphql/mutations";

const useChangeEventState = (variables) => {
  const [changeEventState] = useMutation(CHANGE_EVENT_STATE, {
    variables: variables,
  });
  return changeEventState;
};
export default useChangeEventState;
