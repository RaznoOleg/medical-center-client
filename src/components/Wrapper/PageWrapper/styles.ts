import styled, { css, keyframes } from 'styled-components';
import {
  BORDER,
  DRAWER_CONT,
  GREY,
  NAVY_BLUE,
  NOT_ACTIVE,
  VERY_LIGHT_BLUE,
  WARNING,
  WHITE,
  ZAMBEZI
} from '../../../constants/colors';
import FONT_ROBOTO from '../../../constants/fonts';
import { NORMAL_FONT_SIZE } from '../../../constants/fontSizes';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const PageContainer = styled.div`
  display: flex;
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 16.5vw;
  background-color: ${VERY_LIGHT_BLUE};
  min-height: 100vh;
  box-sizing: border-box;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const NotVerifiedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  font-family: ${FONT_ROBOTO};
  font-size: ${NORMAL_FONT_SIZE};
  color: ${GREY};
  border-radius: 16px;
  background-color: ${WARNING};
  padding: 40px;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const ResendLinkButton = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  border-radius: 30px;
  padding: 15px 20px;
  background-color: ${NOT_ACTIVE};
  color: ${WHITE};
  margin-bottom: 15px;

  &:hover {
    background-color: ${NAVY_BLUE};
    color: ${WHITE};
  }
`;

export const Title = styled.h2`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

export const SuccessUpdateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 70%;
  font-family: ${FONT_ROBOTO};
  font-size: ${NORMAL_FONT_SIZE};
  color: ${ZAMBEZI};
  border-radius: 16px;
  border: 1.5px solid ${BORDER};
  background-color: ${DRAWER_CONT};
  padding: 40px;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;
