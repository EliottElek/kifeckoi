import { useQuery } from "@apollo/client";
import { GET_ALL_CLIENTS } from "../../../graphql/queries";

const useGetAllClients = ({ variables, onCompleted }) => {
  const getAllClients = useQuery(GET_ALL_CLIENTS, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return getAllClients;
};
export default useGetAllClients;
