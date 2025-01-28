import styled, { css, keyframes } from 'styled-components';
import { BORDER, GHOST_WHITE, PINK_SWAN } from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { NORMAL_FONT_SIZE } from '../../constants/fontSizes';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ItemContainer = styled.div`
  background: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  padding: 20px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const ItemsList = styled.ul`
  margin-top: 16px;
  font-family: ${FONT_ROBOTO};
  padding-left: 0px;
`;

export const NotFound = styled.div`
  color: ${PINK_SWAN};
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  text-align: center;
  margin-top: 40px;
`;

export const SearchForm = styled.form`
  text-align: center;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
