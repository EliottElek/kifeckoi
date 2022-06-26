import { useQuery } from "@apollo/client";
import { GET_EVENTS_TYPES_COUNT } from "../../../graphql/queries";

const useGetEventsTypesCount = ({ variables, onCompleted }) => {
  const getEventsTypesCount = useQuery(GET_EVENTS_TYPES_COUNT, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return getEventsTypesCount;
};
export default useGetEventsTypesCount;
