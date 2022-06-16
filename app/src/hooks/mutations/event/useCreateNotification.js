import { useMutation } from "@apollo/client";
import { CREATE_NOTIFICATION } from "../../../graphql/mutations";

const useCreateNotification = (variables) => {
  const [createNotification] = useMutation(CREATE_NOTIFICATION, {
    variables: variables,
  });
  return createNotification;
};
export default useCreateNotification;
