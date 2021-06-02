import styled from 'styled-components';
import { Calendar } from '../../../ui-util/Calendar';
import { popUpState } from '../../../ui-util/GlobalInterface';
import Personnel from './personnel/Personnel';
import Price from './price/price';

interface IProps {
  popUpState: popUpState;
}

const PopUp = ({ popUpState }: IProps) => {
  return (
    <StylePopUp className='pop-up' popUpState={popUpState}>
      {popUpState.calendarPopUp && <Calendar />}
      {/* {popUpState.pricePopUp &&} */}
      {popUpState.pricePopUp && <Price />}
      {/* 펭돌 이거 잠시 주석처리 해둘게요 */}
      {popUpState.personnelPopUp && <Personnel />}
    </StylePopUp>
  );
};

export default PopUp;

const StylePopUp = styled.div<IProps>`
  //props 받아서 어떤게 클릭됬는지 확인후 위치, width, height 바꾸기
  display: ${({ popUpState }) =>
    popUpState.calendarPopUp === true ||
    popUpState.pricePopUp === true ||
    popUpState.personnelPopUp === true
      ? `block`
      : `none`};
  position: absolute;
  left: ${({ popUpState }) =>
    popUpState.calendarPopUp === true
      ? `0px`
      : popUpState.pricePopUp === true
      ? `46%`
      : popUpState.personnelPopUp === true
      ? `56.4%`
      : null};
  width: ${({ popUpState }) =>
    popUpState.calendarPopUp === true
      ? `100%`
      : popUpState.pricePopUp === true
      ? `54%`
      : popUpState.personnelPopUp === true
      ? `43.6%`
      : null};
  top: 5.375rem;
  border-radius: 40px;
  background-color: #fff;
`;

// height: ${({ popUpState }) =>
// popUpState.calendarPopUp === true
//   ? `32rem`
//   : popUpState.pricePopUp === true
//   ? `22.75rem`
//   : popUpState.personnelPopUp === true
//   ? `22.19rem`
//   : null};

async function getData(
  city: string = '',
  checkIn: string | number = '',
  checkOut: string | number = ''
) {
  const query = [];
  // location이 있을 때,
  // checkin, out이 있을 때,
  // 둘 다 있을 때,
  if (city) query.push(`city=${city}`);
  if (checkIn) query.push(`checkIn=${checkIn}`);
  if (checkOut) query.push(`checkOut=${checkOut}`);
  const url = query.reduce(
    (acc, cur, i) => acc + cur + (i > 0 && i < query.length - 1 ? '&' : ''),
    'http://abc.com/place?'
  );
  const data = await fetch(url);
}