import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  GHOST_WHITE,
  BORDER,
  DARK_BLUE,
  ACTIVE,
  NAVY_BLUE,
  WHITE,
  CORNFLOWER_BLUE,
  PINK_SWAN,
  LIGTH_GHOST_WHITE
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { SMALL_FONT_SIZE } from '../../constants/fontSizes';

const slideUp = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  50% {
    height: 294px;
  }
  100% {
    opacity: 1;
    height: fit-content;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
`;

export const SearchBar = styled.input`
  display: flex;
  width: 100%;
  font-family: ${FONT_ROBOTO};
  background-color: ${GHOST_WHITE};
  font-size: ${SMALL_FONT_SIZE};
  border: 1.5px solid ${BORDER};
  border-radius: 8px;
  padding: 20px 35px;
  margin-bottom: 20px;

  &:hover {
    transition: all 0.4s ease-out;
    background-color: ${LIGTH_GHOST_WHITE};
  }

  &:focus {
    outline: none !important;
    border: 1.5px solid ${ACTIVE};
  }
`;

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ACTIVE};
`;

export const AppointmentContainer = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ACTIVE};
`;

export const PatientCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PatientInfoName = styled.h2`
  font-family: system-ui;
  margin-bottom: 0px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ContactsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ContactInfo = styled.p`
  margin-left: 4px;
  line-height: 1.5;
  color: ${DARK_BLUE};

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Overview = styled.div`
  width: 80%;
  color: ${DARK_BLUE};
`;

export const OverviewTitle = styled.span`
  color: ${ACTIVE};
  margin-right: 4px;
  font-weight: 700;
  line-height: 1.25;
`;

export const EditCardLink = styled(NavLink)`
  font-weight: 700;
  text-decoration: none;
  font-size: ${SMALL_FONT_SIZE};
  color: ${ACTIVE};

  &:hover {
    transition: all 0.4s ease-out;
    color: ${NAVY_BLUE};
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -20px;
  color: ${DARK_BLUE};
`;

export const UserInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const ViewLink = styled(NavLink)`
  font-weight: 700;
  text-decoration: none;
  color: ${ACTIVE};

  &:hover {
    transition: all 0.4s ease-out;
    color: ${NAVY_BLUE};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const CreateNoteContainer = styled.div`
  animation: ${slideUp} 0.7s ease-in-out forwards;
`;

export const BookAppointmentButton = styled(NavLink)`
  padding: 0px 12px;
  font-family: ${FONT_ROBOTO};
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  justify-content: center;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  background: ${PINK_SWAN};
  color: ${WHITE};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  }
`;
