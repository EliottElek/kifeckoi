import { useQuery } from "@apollo/client";
import { FIND_EVENTS_BY_PROJECT_ID } from "../../../graphql/queries";

const useFindEventsByProjectId = ({ variables, onCompleted }) => {
  const findEventByProjectId = useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return findEventByProjectId;
};
export default useFindEventsByProjectId;
