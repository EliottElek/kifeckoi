import { useMutation } from "@apollo/client";
import { CHANGE_EVENT_DESCRIPTION } from "../../../graphql/mutations";

const useChangeEventDescription = (variables) => {
  const [changeEventDescription] = useMutation(CHANGE_EVENT_DESCRIPTION, {
    variables: variables,
  });
  return changeEventDescription;
};
export default useChangeEventDescription;
