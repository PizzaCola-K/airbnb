import styled from "styled-components";
import { State } from "../SearchBar";

interface IProps {
    popUpState:State,
}

const PopUp = ({popUpState}:IProps) => {
    return (
        <StylePopUp popUpState={popUpState}>
            {/* {popUpState.calendarPopUp} */}
        </StylePopUp>
    )
}

export default PopUp;

const StylePopUp = styled.div<IProps>`
    //props 받아서 어떤게 클릭됬는지 확인후 위치, width, height 바꾸기
    display: ${({popUpState}) => popUpState.calendarPopUp === true || popUpState.pricePopUp === true || popUpState.personnelPopUp === true ? `block` : `none`};
    position:absolute;
    left: ${({popUpState}) => popUpState.calendarPopUp === true ? `0px` : popUpState.pricePopUp === true ? `46%` : popUpState.personnelPopUp === true ? `56.4%` : null};
    width: ${({popUpState}) => popUpState.calendarPopUp === true ? `100%` : popUpState.pricePopUp === true ? `54%` : popUpState.personnelPopUp === true ? `43.6%` : null};
    height: ${({popUpState}) => popUpState.calendarPopUp === true ? `32rem` : popUpState.pricePopUp === true ? `22.75rem` : popUpState.personnelPopUp === true ? `22.19rem` : null};
    top: 5.375rem;
    border-radius: 40px;
    background-color: white;
`;