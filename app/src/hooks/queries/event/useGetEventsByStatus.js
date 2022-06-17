import { useQuery } from "@apollo/client";
import { GET_EVENTS_BY_STATUS } from "../../../graphql/queries";

const useGetEventsByStatus = ({ variables, onCompleted }) => {
  const getEventsByStatus = useQuery(GET_EVENTS_BY_STATUS, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return getEventsByStatus;
};
export default useGetEventsByStatus;
