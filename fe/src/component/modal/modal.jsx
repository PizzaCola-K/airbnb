import styled from "styled-components";
import ModalContent from "./modalContent/ModalContent";

const Modal = ({props}) => {
    return (
        <StyledModal>
            <ModalContent />
        </StyledModal>
    )
}

export default Modal;

const StyledModal = styled.div`
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #E5E5E5;
`;