import { useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../../graphql/queries";

const useFindProjectByProjectId = ({ variables, onCompleted }) => {
  const findProjectByProjectId = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: variables,
    onCompleted: onCompleted,
  });
  return findProjectByProjectId;
};
export default useFindProjectByProjectId;
