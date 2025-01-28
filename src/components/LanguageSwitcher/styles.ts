import styled from 'styled-components';
import {
  BORDER,
  GHOST_WHITE,
  LIGTH_BLUE,
  LIGTH_GHOST_WHITE,
  NAVY_BLUE,
  NOT_ACTIVE,
  WHITE
} from '../../constants/colors';
import { NORMAL_FONT_SIZE } from '../../constants/fontSizes';
import FONT_ROBOTO from '../../constants/fonts';

export const LanguageSwitcherContainer = styled.div<{ header: string }>`
  position: relative;
  cursor: pointer;
  width: fit-content;
  padding: 5px 50px;
  font-family: ${FONT_ROBOTO};
  border: 1.5px solid
    ${(props) => (props.header === 'true' ? 'transparent' : BORDER)};
  border-radius: 8px;
  font-size: ${NORMAL_FONT_SIZE};
  color: ${(props) => (props.header === 'true' ? LIGTH_BLUE : NOT_ACTIVE)};

  &:hover {
    background-color: ${(props) =>
      props.header === 'true' ? GHOST_WHITE : LIGTH_GHOST_WHITE};
  }
`;

export const LanguageTitle = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

export const LanguageTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LanguagePicker = styled.div<{ open: boolean }>`
  position: absolute;
  width: 160px;
  margin-top: 10px;
  left: 0;
  border: 1.5px solid ${BORDER};
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

export const Language = styled.div<{ selected: boolean }>`
  display: flex;
  cursor: pointer;
  padding: 5px 15px;
  color: ${(props) => (props.selected ? WHITE : NOT_ACTIVE)};
  background-color: ${(props) => (props.selected ? NAVY_BLUE : WHITE)};

  &:hover {
    background-color: ${(props) =>
      props.selected ? NAVY_BLUE : LIGTH_GHOST_WHITE};
  }
`;
