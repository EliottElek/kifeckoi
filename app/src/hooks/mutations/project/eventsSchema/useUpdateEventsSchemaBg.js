import { useMutation } from "@apollo/client";
import { UPDATE_EVENTS_SCHEMA_BG } from "../../../../graphql/mutations";

const useUpdateEventsSchemaBg = (variables) => {
  const [updateEventsSchemaBg] = useMutation(UPDATE_EVENTS_SCHEMA_BG, {
    variables: variables,
  });
  return updateEventsSchemaBg;
};
export default useUpdateEventsSchemaBg;
