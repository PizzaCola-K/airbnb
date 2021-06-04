import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ReservationPlace from './reservation-place/ReservationPlace';

interface WishListInterface {
    wish: boolean;
    setWish: React.Dispatch<React.SetStateAction<boolean>>;
}

interface StayInterface {
    id: number;
    imageUrl: string[];
    name: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    like: boolean;
    likeCount: number;
    price: number;
    option: string;
    additionalOption: string;
}

const WishList = ({wish, setWish}: WishListInterface) => {
    
    const [list, setList] = useState<StayInterface[]>([]);
    const Authorization =
    (localStorage.getItem('token') &&
      'Bearer ' + localStorage.getItem('token')) ||
    '';
    const value = localStorage.getItem("placeId");
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
            setList(response);
        }
        data();
    },[]);

    const onClose = () => {
        setWish(false);
    }

    const reservationList = () => {
        return list.map((v,i) => {
            return <ReservationPlace key={i} {...v}/>
        })
    }

    return (
        <>
            {wish &&
                <>
                    <StyledWishList>
                        <StyledButton onClick={onClose}><FaTimes /></StyledButton>
                        <h2>위시 리스트</h2>
                        {reservationList()}
                    </StyledWishList>
                    <StyledBg />
                </>
            }
        </>
    )
}

export default WishList

const StyledWishList = styled.div`
    position: absolute;
    width: 22rem;
    right: 10rem;
    top: 0rem;
    z-index: 3;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    max-height: 30rem;
    overflow-y: scroll;
    h2 {
        padding-bottom: 0.25rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #e0e0e0;
    }
`;

const StyledButton = styled.button`
    background-color: #fff;
    border: 0px;
    position: absolute;
    right: 0.5rem;
    padding: 0.5rem;
    line-height: 0rem;
    font-size: 1.25rem;
    cursor: pointer;
`;

const StyledBg = styled.div`
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2;
    & > li {
        background-color: #fff;
    }
`;
