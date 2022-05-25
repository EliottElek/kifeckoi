import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "240px",
  minHeight: "120px",
  maxHeight: "80%",
  maxWidth: "800px",
  width: "85%",
  boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-background-1)",
  padding: "30px 8px",
};

export default function BasicModal({ children, open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus={true}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
