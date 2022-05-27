import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function BasicModal({ children, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: fullScreen ? "90vh" : "80%",
    height: fullScreen ? "90vh" : "80%",
    width: fullScreen ? "100vw" : "85%",
    maxWidth: fullScreen ? "none" : "900px",
    boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
    borderRadius: fullScreen ? "0px" : "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-background-1)",
  };

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus={true}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
