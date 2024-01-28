
import UnauthorizedCard from '@/app/components/common/UnauthorizedCard/UnauthorizedCard';
import Modal from '@/app/components/common/Modal/Modal';

export default function UnauthorizeModalPresentation({ open, handleClose, onLoginClick }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <>
        <UnauthorizedCard onCloseButtonClick={handleClose} isCloseButtonVisible={true} />
      </>
    </Modal>
  );

}