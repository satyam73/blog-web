import { Box, Modal as MUIModal } from "@mui/material";

export default function Modal({ open, handleClose, children }) {
  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      sx={{ display: 'grid', placeItems: 'center' }}
    // hideBackdrop={false}
    >
      {children}
    </MUIModal>
  );
}