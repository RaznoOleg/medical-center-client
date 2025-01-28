import styled from 'styled-components';
import {
  GHOST_WHITE,
  BORDER,
  DARK_BLUE,
  ACTIVE,
  PINK_SWAN,
  NAVY_BLUE
} from '../../../constants/colors';
import FONT_ROBOTO from '../../../constants/fonts';
import { SMALL_FONT_SIZE } from '../../../constants/fontSizes';

export const AppointmentCardContainer = styled.div`
  background: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  padding: 20px 35px;
  margin-bottom: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomContainer = styled.div`
  margin-top: 15px;
  border-top: 1px solid ${BORDER};
  font-size: ${SMALL_FONT_SIZE};
`;

export const Counter = styled.div`
  color: ${PINK_SWAN};
`;

export const DateTitle = styled.b`
  color: ${ACTIVE};
`;

export const FullName = styled.div`
  width: 30%;
  text-align: center;
  font-weight: bold;
  color: ${DARK_BLUE};
`;

export const DateInfo = styled.div`
  color: ${DARK_BLUE};
`;

export const DeleteAppointmentButton = styled.div`
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  color: ${ACTIVE};

  &:hover {
    transition: all 0.4s ease-out;
    color: ${NAVY_BLUE};
  }
`;
