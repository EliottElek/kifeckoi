import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutations";

const useLogin = (variables) => {
  const [login] = useMutation(LOGIN, {
    variables: variables,
  });
  return login;
};
export default useLogin;
