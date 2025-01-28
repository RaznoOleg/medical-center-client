import styled, { keyframes, css } from 'styled-components';
import FONT_ROBOTO from '../../constants/fonts';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const WrapperElement = styled.div`
  padding: 10px 16px;
  margin: 35px;
  width: 80%;
  font-family: ${FONT_ROBOTO};
  min-height: 90vh;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;
