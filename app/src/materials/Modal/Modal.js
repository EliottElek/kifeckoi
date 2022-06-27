import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function BasicModal({ children, open, onClose, card }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: fullScreen ? "-webkit-fill-available" : "80%",
    height: fullScreen ? "-webkit-fill-available" : "none",
    width: fullScreen ? "100vw" : "85%",
    maxWidth: fullScreen ? "none" : "900px",
    minHeight: card ? "90%" : "none",
    boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
    borderRadius: fullScreen ? "0px" : "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "var(--background1)",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableAutoFocus={true}
      onClick={(e) => e.stopPropagation()}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
