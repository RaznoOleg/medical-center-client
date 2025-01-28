import styled, { keyframes } from 'styled-components';
import {
  WHITE,
  BLACK,
  GRAY_SHADOW,
  ZAMBEZI,
  PINK_SWAN,
  NAVY_BLUE,
  CORNFLOWER_BLUE,
  GREY,
  LIGTH_RED,
  WARNING
} from '../../constants/colors';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '../../constants/fontSizes';
import FONT_ROBOTO from '../../constants/fonts';

const scaleInAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleOutAnimation = keyframes`
   from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(0);
  }
`;

export const ModalContainer = styled.div<{ closing?: string }>`
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_ROBOTO};
  border-radius: 16px;
  height: fit-content;
  width: 30%;
  padding: 50px;
  background-color: ${WHITE};
  color: ${BLACK};
  font-size: ${NORMAL_FONT_SIZE};

  animation: ${({ closing }) =>
      closing ? scaleOutAnimation : scaleInAnimation}
    0.5s ease-in-out forwards;
`;

export const ModalContent = styled.div`
  width: 100%;
`;

export const ModalButtonsWrapper = styled.div`
  display: flex;
  width: max-width;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${GRAY_SHADOW};
`;

export const Title = styled.h2`
  color: ${BLACK};
  margin: 0;
  font-family: ${FONT_ROBOTO};
  text-align: center;
`;

export const SelectTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SelectTimeTitle = styled.div`
  color: ${ZAMBEZI};
  font-size: ${NORMAL_FONT_SIZE};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ConfirmButton = styled.input`
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
  font-weight: bold;
  cursor: pointer;
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
`;

export const CancelButton = styled.input`
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

export const ErrorText = styled.div`
  text-align: center;
  border-radius: 8px;
  padding: 16px 0px;
  color: ${GREY};
  background-color: ${LIGTH_RED};
  margin-top: 1em;

  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const WarningText = styled.div`
  text-align: center;
  border-radius: 8px;
  padding: 16px 0px;
  color: ${GREY};
  background-color: ${WARNING};
  margin-top: 1em;
`;
