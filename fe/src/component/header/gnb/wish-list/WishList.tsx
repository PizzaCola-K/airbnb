import styled from 'styled-components'
import { useEffect, useState } from 'react';
import ReservationPlace from './reservation-place/ReservationPlace';

const WishList = () => {
    const [list, setList] = useState([]);
    const Authorization =
    (localStorage.getItem('token') &&
      'Bearer ' + localStorage.getItem('token')) ||
    '';

    useEffect(() => {
        const data = async () => {
            const result = await fetch('http://3.36.239.71/api/reservations',{
                method: "GET",
                headers: {
                    // Origin: localhost:3000 이 들어갈떄와 안들어갈때의 차이를 모르겠음. 들어갈땐 POST 요청일때만인가요?
                    Authorization,
                },
            });
            const response = await result.json();
            setList(response);
        }
        data();
    },[]);

    const reservationList = () => {
        // {checkIn,checkOut,guests,price,place}
        return list.map((_,i) => {
            return <ReservationPlace key={i} />
        })
    }

    return (
        <StyledWishList>
            {reservationList()}
        </StyledWishList>
    )
}

export default WishList

const StyledWishList = styled.div`
    position:absolute;
    right:20rem;
`;
