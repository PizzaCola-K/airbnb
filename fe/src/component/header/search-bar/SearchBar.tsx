import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';
import { SearchDate } from './SearchDate';
import { SearchPrice } from './SearchPrice';
import { SearchPersonnel } from './SearchPersonnel';

export const SearchBar = () => {
  return (
    <StyleSearchBar>
      <SearchDate></SearchDate>
      <SearchPrice></SearchPrice>
      <SearchPersonnel></SearchPersonnel>
      <StyleSearchButton>
        <FaSearch />
      </StyleSearchButton>
    </StyleSearchBar>
  );
};

const StyleSearchBar = styled.div`
  width: 60vw;
  margin: 0 auto;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 40% 30% 20% 10%;
  background: #fff;
  border-radius: 3rem;
  position: relative;
`;

const StyleSearchButton = styled.button`
  background-color: #ff4545;
  border: 0;
  outline: 0;
  border-radius: 0 3rem 3rem 0;
  * {
    color: #fff;
  }
  svg {
    font-size: 1.25rem;
  }
`;
