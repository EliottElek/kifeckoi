import { useMutation } from "@apollo/client";
import { CAPTURE_EVENTS_POSITIONS } from "../../../graphql/mutations";

const useCaptureEventsPositions = (variables) => {
  const [captureEventsPositions] = useMutation(CAPTURE_EVENTS_POSITIONS, {
    variables: variables,
  });
  return captureEventsPositions;
};
export default useCaptureEventsPositions;
