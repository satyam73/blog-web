import UnauthorizeModalPresentation from "./UnauthorizeModalPresentation";


export default function UnauthorizeModal({ open, handleClose, onLoginClick, }) {
  return (
    <UnauthorizeModalPresentation open={open} handleClose={handleClose} onLoginClick={onLoginClick} />
  );

}