import styled from 'styled-components'
import { useContext, useState } from 'react';
import { ModalContext,usePriceState, personnelContext } from '../../../list/List';
import { Calendar } from '../../../ui-util/Calendar';
import Reservation from '../reservation/Reservation';

const Info = () => {
    const [startDate, endDate] = useContext(ModalContext);
    const [onCalendar, setOnCalendar] = useState(false);
    const [onReservation, setOnReservation] = useState(false);
    const price = usePriceState();
    const personnelState = useContext(personnelContext);
    
    const calendarToggle = () => {
        setOnCalendar(!onCalendar);
    }

    const handleReservation = () => {
        setOnReservation(!onReservation);
        // setModal({show: false});
    }
    
    const personnelCount = () => {
        const personnel = personnelState.map(v => v.count).reduce((acc,cur) => acc+=cur,0);
        console.log(personnel)
        return `게스트 ${personnel}명`;
    }

    return (
        <StyledInfo>
            {/* 맨위 가격 */}
            <StoreInfo>
                <div>
                    {price && <Price>{`₩${price.price}`}</Price>}
                    <Days>/박</Days>
                </div>
                <Review>후기 127개</Review>
            </StoreInfo>
            {/* 체크인 체크아웃 인원 예약하기 예약확정 */}
            <UserInfo>
                <div>
                    <CheckIO onClick={calendarToggle}>
                        <CheckTitle>체크인</CheckTitle>
                        <CheckInfo>{startDate}</CheckInfo>
                    </CheckIO>
                    <CheckIO onClick={calendarToggle}>
                        <CheckTitle>체크아웃</CheckTitle>
                        <CheckInfo>{endDate}</CheckInfo>
                    </CheckIO>
                </div>
                {onCalendar && <StyledCalendar><Calendar popUpModal={onCalendar}/></StyledCalendar>}
                <div>
                    <CheckIO>
                        <CheckTitle>인원</CheckTitle>
                        <CheckInfo >{personnelCount()}</CheckInfo>
                    </CheckIO>
                </div>
            </UserInfo>
            <ReservationButton onClick={handleReservation}>예약하기</ReservationButton>
            {onReservation && <Reservation/>}
            <Warning>예약 확정 전에는 요금이 청구되지 않습니다.</Warning>
        </StyledInfo>
    )
}

export default Info;

const StyledCalendar = styled.div`
    position:absolute;
    margin-top:.1rem;
    border-radius: 2rem;
    left:30rem;
    z-index: 100;
    background-color: white;
    width: 40%;
`;

const Warning = styled.div`
    padding:1rem;
    text-align:center;
    color:#4F4F4F;
    font-size: 12px;
    line-height: 17px;
`;

const ReservationButton = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    cursor:pointer;
    background-color:#333;
    border-radius:10px;
    width:352px;
    height:55px;
    margin:auto;
`;

const UserInfo = styled.div`
    border: 1px solid #BDBDBD;
    box-sizing:border-box;
    border-radius:10px;
    margin: 1rem 0;
    > div {
        display:flex;
        &:last-child {
            border-top: 1px solid #BDBDBD;
        }
    }
`;
const CheckIO = styled.div`
    cursor: pointer;
    width: 50%;
    padding-left:1rem;
    padding: 0.5rem 1rem;
    &:nth-child(2n) {
        border-left: 1px solid #BDBDBD;
    }
`;
const CheckTitle = styled.div`
    color: #010101;
    font-size: 12px;
    font-weight:bold;
    line-height: 17px;
`;
const CheckInfo = styled.div`
    font-size: 14px;
    line-height: 20px;
    color:#4F4F4F;
`;
const Price = styled.span`
    font-weight:bold;
    color : #010101;
    font-size: 20px;
    line-height: 20px;
`;
const Days = styled.span`
    color: #828282;
    font-size: 14px;
    line-height: 20px;
`;
const Review = styled.div`
    color: #828282;
    font-weight: bold;
font-size: 12px;
line-height: 17px;
text-decoration-line: underline;
`;

const StoreInfo = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    > div {
        display:flex;
    }
`;

const StyledInfo = styled.div`
    padding: 1.5rem;
    padding-bottom:0;
`;