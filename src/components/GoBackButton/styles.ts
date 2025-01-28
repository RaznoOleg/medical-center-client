import styled, { css, keyframes } from 'styled-components';
import { BLACK, NAVY_BLUE } from '../../constants/colors';
import { NORMAL_FONT_SIZE } from '../../constants/fontSizes';
import FONT_ROBOTO from '../../constants/fonts';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  width: 80%;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const LinkContainer = styled.div`
  text-align: center;
  font-style: normal;
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  position: absolute;
  padding-top: 25px;
`;

export const GoBack = styled.a`
  text-align: center;
  font-style: normal;
  font-weight: bold;
  color: ${BLACK};
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${NAVY_BLUE};

    & > i {
      border: solid ${NAVY_BLUE};
      display: inline-block;
      border-width: 0 2px 2px 0;
    }
  }
`;
