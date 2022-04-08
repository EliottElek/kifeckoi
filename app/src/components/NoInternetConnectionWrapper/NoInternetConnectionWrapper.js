import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const NoInternetConnection = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
    if (!isOnline)
      return toast.warning(
        "Vous êtes hors connexion. Vérifiez votre connexion internet.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
        }
      );
  }, [isOnline]);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });
  return props.children;
};

export default NoInternetConnection;
