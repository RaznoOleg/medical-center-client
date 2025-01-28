import styled from 'styled-components';
import {
  GHOST_WHITE,
  ACTIVE,
  LIGTH_GHOST_WHITE
} from '../../../constants/colors';
import { SMALL_FONT_SIZE } from '../../../constants/fontSizes';
import FONT_ROBOTO from '../../../constants/fonts';

export const AddNoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_ROBOTO};
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${ACTIVE};
  border-radius: 8px;
  padding: 18px 0px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    transition: all 0.4s ease-out;
    background-color: ${LIGTH_GHOST_WHITE};
  }
`;

export const Text = styled.div`
  color: ${ACTIVE};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
