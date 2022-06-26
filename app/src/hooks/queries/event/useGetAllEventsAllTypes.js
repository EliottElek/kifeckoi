import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS_ALL_TYPES } from "../../../graphql/queries";

const useGetAllEventsAllTypes = ({ variables, onCompleted }) => {
  const getAllEventsAllTypes = useQuery(GET_ALL_EVENTS_ALL_TYPES, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return getAllEventsAllTypes;
};
export default useGetAllEventsAllTypes;
