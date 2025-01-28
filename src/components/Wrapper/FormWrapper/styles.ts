import styled, { keyframes, css } from 'styled-components';
import { BORDER, GHOST_WHITE } from '../../../constants/colors';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const WrapperElement = styled.div`
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 16px;
  padding: 10px 16px;
  margin: 65px;
  width: 80%;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;
