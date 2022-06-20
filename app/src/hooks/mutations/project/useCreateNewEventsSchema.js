import { useMutation } from "@apollo/client";
import { CREATE_NEW_EVENTS_SCHEMA } from "../../../graphql/mutations";

const useCreateNewEventsSchema = (variables) => {
  const [createNewEventsSchema] = useMutation(CREATE_NEW_EVENTS_SCHEMA, {
    variables: variables,
  });
  return createNewEventsSchema;
};
export default useCreateNewEventsSchema;
