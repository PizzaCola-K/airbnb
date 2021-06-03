import styled from 'styled-components';
import { useContext } from 'react';
import { showModalContext } from '../../../list/List';

const Reservation = () => {
    const {modal,setModal} = useContext(showModalContext);

    const handleModal = () => {
        setModal({show:false});
    }

    return (
        <StyledReservation>
            <div>🎉예약되었습니다🎉</div>
            <div>감사합니다.</div>
            <ReservationButton onClick={handleModal}>확인</ReservationButton>
        </StyledReservation>
    )
}

export default Reservation

const ReservationButton = styled.div`
    cursor: pointer;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    width:152px;
    height:25px;
    border-radius: .2rem;
`;

const StyledReservation = styled.div`
    position:absolute;
    top:22rem;
    background-color: white;
    text-align: -webkit-center;
    border-radius: .5rem;
    margin:auto;
    width:352px;
    height:85px;
`;