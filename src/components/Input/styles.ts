import styled from 'styled-components';
import { WHITE, RED, WHISPER, NAVY_BLUE } from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { VERY_SMALL_FONT_SIZE } from '../../constants/fontSizes';

const InputContainer = styled.div<{ error?: string }>`
  background: ${WHITE};
  width: 100%;
  font-style: normal;
  height: 60px;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};

  @media (max-width: 1600px) {
    margin-bottom: ${(props) => (props.error === 'true' ? '20px' : '0px')};
  }

  & .MuiInputBase-root {
    height: 60px;
    border-radius: 8px !important;
    border: ${(props) =>
      props.error === 'true' ? `2px solid ${RED}` : '2px solid transparent'};
    border-color: ${(props) =>
      props.error === 'true' ? `${RED}` : `${WHISPER}`};
    margin-bottom: ${(props) => (props.error === 'true' ? '0px' : '20px')};

    &.Mui-focused fieldset {
      border-color: ${NAVY_BLUE} !important;
    }

    &:hover fieldset {
      transition: all 0.4s ease-out;
      border-color: ${NAVY_BLUE};
    }

    &.Mui-focused {
      border: 2px solid ${NAVY_BLUE};

      transition: 0.1s ease-in-out;
    }

    fieldset {
      border: 0;
    }
  }

  & .MuiFormHelperText-root {
    color: ${RED};
    margin-left: 0;
    font-family: ${FONT_ROBOTO};
    font-size: ${VERY_SMALL_FONT_SIZE};
  }
`;
export default InputContainer;
