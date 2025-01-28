import styled, { css, keyframes } from 'styled-components';
import { PINK_SWAN } from '../../../../constants/colors';
import { LARGE_FONT_SIZE } from '../../../../constants/fontSizes';
import FONT_ROBOTO from '../../../../constants/fonts';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SelectedContainer = styled.div`
  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const SelectedDayInfo = styled.h1`
  color: ${PINK_SWAN};
  margin-top: 35px;
  margin-bottom: 20px;
  font-size: ${LARGE_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
`;
