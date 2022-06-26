import { useMutation } from "@apollo/client";
import { CREATE_NEW_EVENTS_STATUS } from "../../../graphql/mutations";

const useCreateNewEventsStatus = (variables) => {
  const [createNewEventsStatus] = useMutation(CREATE_NEW_EVENTS_STATUS, {
    variables: variables,
  });
  return createNewEventsStatus;
};
export default useCreateNewEventsStatus;
