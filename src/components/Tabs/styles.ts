import styled from 'styled-components';
import {
  ACTIVE,
  NAVY_BLUE,
  WHISPER,
  LIGTH_GHOST_WHITE,
  LIGHT_GRAY_BLUE
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { MEDIUM_FONT_SIZE } from '../../constants/fontSizes';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const TabButtonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 0;
`;

export const TabButton = styled.button<{ active: boolean }>`
  font-family: ${FONT_ROBOTO};
  font-size: ${MEDIUM_FONT_SIZE};
  padding: 16px 32px;
  border: none;
  background-color: ${LIGHT_GRAY_BLUE};
  color: ${({ active }) => (active ? NAVY_BLUE : ACTIVE)};
  cursor: pointer;
  border-radius: 12px 12px 0 0;
  margin-right: 8px;
  font-weight: ${({ active }) => (active ? 'bold' : '600')};
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${({ active }) =>
    active ? '0 -2px 8px rgba(0, 0, 0, 0.08)' : 'none'};
  border: 1px solid ${WHISPER};
  border-bottom: ${({ active }) =>
    active ? `3px solid ${ACTIVE}` : `3px solid transparent`};

  &:hover {
    background-color: ${LIGTH_GHOST_WHITE};
    color: ${({ active }) => (active ? NAVY_BLUE : ACTIVE)};
    opacity: ${({ active }) => (active ? 1 : 0.8)};
    box-shadow: ${({ active }) =>
      active ? '0 -2px 8px rgba(0, 0, 0, 0.12)' : 'none'};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const TabContent = styled.div`
  padding: 30px 20px;
  background-color: ${LIGHT_GRAY_BLUE};
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${WHISPER};
`;
