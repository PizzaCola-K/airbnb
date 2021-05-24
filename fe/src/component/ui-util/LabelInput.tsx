import styled from 'styled-components';

interface LabelInputInterface {
  className?: string;
  type: string;
  title: string;
  value: string;
  disabled: boolean;
  placeholder: string;
  onClick?(e: React.MouseEvent<HTMLInputElement>): void;
}

export const LabelInput: React.FunctionComponent<LabelInputInterface> = ({
  className = '',
  type = 'text',
  title = '',
  value = '',
  disabled = false,
  placeholder = '',
  onClick,
}) => {
  return (
    <StyleLabelInput onClick={onClick} className={className}>
      <label>{title}</label>
      <input {...{ type, value, placeholder, disabled }} />
    </StyleLabelInput>
  );
};

const StyleLabelInput = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  & > * {
    display: block;
    cursor: pointer;
  }
  label {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  input {
    font-size: 1rem;
    color: #4f4f4f;
    background-color: transparent;
    border: 0;
  }
  input.active {
    color: #333;
  }
`;
