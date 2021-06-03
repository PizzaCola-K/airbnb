import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { addCommaToNumber } from '../../util';
import { useState, useEffect } from 'react';
import { usePriceDispatch } from './List';
import { StayInterface } from '../ui-util/GlobalInterface';

const updateLike = async (placeId: number, wish: boolean) => {
  const Authorization =
    (localStorage.getItem('token') &&
      'Bearer ' + localStorage.getItem('token')) ||
    '';
  const value = {
    placeId,
  };
  if (wish) {
    const data = await fetch('http://3.36.239.71/api/likes', {
      method: 'POST',
      headers: {
        Origin: 'http://localhost:3000',
        Authorization,
      },
      body: JSON.stringify(value),
    });
    const json = await data.json();
    console.log('post ' + json);
    return json;
  } else {
    const data = await fetch(`http://3.36.239.71/api/likes/${placeId}`, {
      method: 'DELETE',
      headers: {
        Origin: 'http://localhost:3000',
        Authorization,
      },
      body: JSON.stringify(value),
    });
    const json = await data.json();
    console.log('delete ' + json);
    return json;
  }
};

export const Stay = ({
  id,
  imageUrl,
  location,
  name,
  like,
  likeCount,
  price,
  option,
  additionalOption,
  onShowModal = (): void => {},
}: StayInterface) => {
  const dispatch = usePriceDispatch();
  const [wish, setWish] = useState(like);

  const toggleWish = async () => {
    const result = await updateLike(id, !wish);
    console.log(result);
    setWish(!wish);
  };
  return (
    <StyleStay
      onClick={(e) => {
        onShowModal(e);
        dispatch({ price });
      }}
    >
      <StyleImages>
        <StyleImage img_src={imageUrl} />
      </StyleImages>
      <StyleContent>
        <button onClick={toggleWish}>
          {wish ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className='sub-title'>{location?.address}</p>
        <p className='title'>{name}</p>
        <p className='description'>{option}</p>
        <p className='price'>₩{addCommaToNumber(price)} / 박</p>
        <div className='content-bottom'>
          <p className='wish-count'>
            <FaHeart />
            {likeCount}
          </p>
          <p className='total-price'>₩{addCommaToNumber(price * 3)}</p>
        </div>
      </StyleContent>
    </StyleStay>
  );
};

const StyleStay = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1.5rem 0;
  border-bottom: 1px solid transparent;
  &:not(:last-child) {
    border-bottom-color: #e0e0e0;
  }
`;

const StyleImages = styled.div`
  height: 12.5rem;
  padding-right: 0.75rem;
`;

const StyleImage = styled.div<{ img_src: string[] }>`
  background-image: url(${(props) => props.img_src});
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.625rem;
`;

const StyleContent = styled.div`
  position: relative;
  padding-left: 0.75rem;
  button {
    font-size: 1.25rem;
    position: absolute;
    right: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  .sub-title {
    font-size: 0.75rem;
    color: #828282;
    margin-bottom: 0.5rem;
  }
  .title {
    font-size: 0.875rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  .description {
    font-size: 0.75rem;
    color: #828282;
    height: 6.5rem;
    margin-bottom: 0.5rem;
  }
  .price {
    font-size: 0.875rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.3125rem;
    text-align: right;
  }
  .content-bottom {
    display: flex;
    justify-content: space-between;
    .wish-count {
      font-size: 0.75rem;
      color: #828282;
      display: flex;
      align-items: center;
      * {
        margin-right: 0.25rem;
      }
    }
    .total-price {
      font-size: 0.75rem;
      color: #828282;
      text-decoration: underline;
    }
  }
`;
