import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/mutations";

const useCreateUser = (variables) => {
  const [createUser] = useMutation(CREATE_USER, {
    variables: variables,
  });
  return createUser;
};
export default useCreateUser;
