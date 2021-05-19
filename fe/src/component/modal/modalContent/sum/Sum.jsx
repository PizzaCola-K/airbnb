import styled from 'styled-components';

const Sum = () => {
    return (
        <StyledSum>
           <ChargeTable>
               <li>반복문 돌리기</li>
           </ChargeTable>
           <AllSum>
                <div>총 합계</div>
                <div>₩1488195</div>
           </AllSum>
        </StyledSum>
    )
}

export default Sum;

const AllSum = styled.div`
    display:flex;
    justify-content:space-between;
    font-size: 16px;
    line-height: 23px;
    color:#333;
    &:first-child {
        text-decoration-line: underline;
    }
`;

const ChargeTable = styled.ul``;

const StyledSum = styled.div`
    padding:1.5rem;
    padding-top:0;
`;
