import styled from 'styled-components';
import { useContext } from 'react';
import { showModalContext } from '../../../list/List';

const Reservation = () => {
    const {modal,setModal} = useContext(showModalContext);

    const handleModal = () => {
        setModal({show:false});
    }

    return (
        <>
            <StyledReservation>
                <div className="modal-title">🎉예약되었습니다🎉</div>
                <div className="modal-content">감사합니다.</div>
                <ReservationButton onClick={handleModal}>확인</ReservationButton>
            </StyledReservation>
            <StyledBg />
        </>
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
    padding: 0.25rem;
    margin-bottom: 1rem;
    border-radius: .2rem;
`;

const StyledReservation = styled.div`
    position:absolute;
    z-index: 1;
    top:22rem;
    background-color: white;
    text-align: -webkit-center;
    border-radius: .5rem;
    margin:auto;
    width:352px;
    .modal-title {
        padding: 1rem;
    }
    .modal-content {
        margin-bottom: 0.5rem;
    }
`;

const StyledBg = styled.div`
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.75);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
`;