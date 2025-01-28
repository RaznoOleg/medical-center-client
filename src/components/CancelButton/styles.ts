import styled from 'styled-components';
import { PINK_SWAN, WHITE } from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { SMALL_FONT_SIZE } from '../../constants/fontSizes';

export const CancelContainer = styled.input`
  &&:disabled {
    background: ${PINK_SWAN};
    color: ${WHITE};
    cursor: inherit;
  }

  text-align: center;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 55px;
  width: 45%;
  margin-top: 20px;
  color: ${WHITE};
  font-size: ${SMALL_FONT_SIZE};
  background: ${PINK_SWAN};
  font-weight: bold;
  cursor: pointer;
`;
