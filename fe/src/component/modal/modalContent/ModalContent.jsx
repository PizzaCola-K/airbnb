import styled from 'styled-components';
import Info from './information/Info';
import Sum from './sum/Sum';

const ModalContent = () => {
    return (
        <StyledModalContent className='modal-content'>
            <Info />
            <Sum />
        </StyledModalContent>
    )
}

export default ModalContent

const StyledModalContent = styled.div`
    background-color:white;
    width:400px;
    height:542px;
    border-radius:10px;
`;