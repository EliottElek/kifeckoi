import { useQuery } from "@apollo/client";
import { FIND_EVENT_BY_EVENT_ID } from "../../../graphql/queries";

const useFindEventByEventId = ({ variables, onCompleted }) => {
  const findEventByEventId = useQuery(FIND_EVENT_BY_EVENT_ID, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return findEventByEventId;
};
export default useFindEventByEventId;
