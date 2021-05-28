import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { addCommaToNumber } from '../../util';
import { useState } from 'react';

// interface StayInterface {
//   images?: string[];
//   subTitle?: string;
//   title?: string;
//   description?: string;
//   price?: number;
//   wishCount?: number;
//   isWish?: boolean;
//   onShowModal: React.MouseEventHandler<HTMLElement>;
// }

interface StayInterface {
  id: number;
  imageUrl: string[];
  name: string;
  location: {
    latitude: number,
    longitude: number,
    address: string
  };
  likeCount: number;
  price: number;
  option: string;
  addtionalOption: string;
  onShowModal: React.MouseEventHandler<HTMLElement>;
}

export const Stay: React.FunctionComponent<StayInterface> = ({
  imageUrl,
  location,
  name,
  likeCount,
  price,
  option,
  addtionalOption,
  // images = [],
  // subTitle = '서초구의 아파트 전체',
  // title = '서울특별시 강남구 강남대로62길 23 4층',
  // description = '최대 인원 3명, 침실 1개, 욕실 1개, 침대 1개, 헤어드라이어, 최대 인원 3명, 침실 1개, 욕실 1개, 침대 1개, 헤어드라이어',
  // price = 50000,
  // wishCount = 20,
  // isWish = false,
  onShowModal = (): void => {},
}) => {
  const isWish = false;
  const [wish, setWish] = useState(isWish);
  const toggleWish = () => {
    setWish(!wish);
  };
  return (
    <StyleStay onClick={(e) => onShowModal(e)}>
      <StyleImages>
        <StyleImage img_src={imageUrl} />
      </StyleImages>
      <StyleContent>
        <button onClick={toggleWish}>
          {wish ? <FaRegHeart /> : <FaHeart />}
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
