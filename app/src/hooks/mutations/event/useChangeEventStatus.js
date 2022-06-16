import { useMutation } from "@apollo/client";
import { CHANGE_EVENT_STATUS } from "../../../graphql/mutations";

const useChangeEventStatus = (variables) => {
  const [changeEventStatus] = useMutation(CHANGE_EVENT_STATUS, {
    variables: variables,
  });
  return changeEventStatus;
};
export default useChangeEventStatus;
