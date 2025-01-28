import styled, { css, keyframes } from 'styled-components';
import {
  ACTIVE,
  BORDER,
  DARK_BLUE,
  GHOST_WHITE,
  LIGTH_GHOST_WHITE,
  NAVY_BLUE,
  PINK_SWAN
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { SMALL_FONT_SIZE } from '../../constants/fontSizes';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const NoteContainer = styled.div`
  font-family: ${FONT_ROBOTO};
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 8px;
  padding: 20px 35px;
  margin-bottom: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

export const DateTitle = styled.div`
  color: ${PINK_SWAN};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${ACTIVE};
  border-radius: 8px;
  width: 100%;
  text-align: center;
  height: 50px;
  font-weight: bold;
  font-size: ${SMALL_FONT_SIZE};
  color: ${ACTIVE};
  cursor: pointer;

  &:hover {
    transition: all 0.4s ease-out;
    background-color: ${LIGTH_GHOST_WHITE};
  }
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${ACTIVE};
  border-radius: 8px;
  width: 100%;
  text-align: center;
  height: 50px;
  font-weight: bold;
  font-size: ${SMALL_FONT_SIZE};
  color: ${ACTIVE};
  cursor: pointer;

  &:hover {
    transition: all 0.4s ease-out;
    background-color: ${LIGTH_GHOST_WHITE};
  }
`;

export const DeleteFile = styled.div`
  display: flex;
  cursor: pointer;
`;

export const Files = styled.div`
  display: flex;
  align-items: center;
`;

export const FileName = styled.div`
  color: ${DARK_BLUE};

  &:hover {
    cursor: pointer;
    color: ${NAVY_BLUE};
  }
`;

export const NoteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1.5px solid ${BORDER};
  border-bottom: 1.5px solid ${BORDER};
  padding: 20px 0px;
`;

export const TextAreaContainer = styled.div`
  display: flex;
  color: ${DARK_BLUE};
`;

export const FileInfoContainer = styled.div`
  display: flex;
  margin-top: 20px;
  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const DownloadFileInfoContainer = styled.div`
  display: flex;
  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 70px;
  resize: none;
  align-items: center;
  border-radius: 4px;
  color: ${DARK_BLUE};
  padding: 20px;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  border: 1.5px solid ${BORDER};
  margin-right: 20px;

  &:focus {
    outline: none !important;
    border: 1.5px solid ${ACTIVE};
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-input-placeholder {
    color: ${PINK_SWAN};
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${PINK_SWAN};
    border-radius: 125px;
    cursor: pointer;
    padding-bottom: 40px;
  }
`;

export const DoctorInfoContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 20px;
  color: ${PINK_SWAN};
`;
