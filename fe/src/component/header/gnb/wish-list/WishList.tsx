import styled from 'styled-components'
import { useEffect, useState } from 'react';
import ReservationPlace from './reservation-place/ReservationPlace';

const WishList = () => {
    const [list, setList] = useState([]);
    const Authorization =
    (localStorage.getItem('token') &&
      'Bearer ' + localStorage.getItem('token')) ||
    '';
    const value = localStorage.getItem("placeId");
    console.log(value)
    useEffect(() => {
        const data = async () => {
            const result = await fetch('http://3.36.239.71/api/likes',{
                method: "GET",
                headers: {
                    Origin: 'http://localhost:3000',
                    Authorization,
                },
            });
            const response = await result.json();
            console.log(response)
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
