import styled from 'styled-components';
import ModalContent from './modalContent/ModalContent';

interface ModalInterface {
  placeId: number;
}

const Modal = ({ placeId }: ModalInterface) => {
  return (
    <StyledModal>
      <ModalContent placeId={placeId} />
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;
