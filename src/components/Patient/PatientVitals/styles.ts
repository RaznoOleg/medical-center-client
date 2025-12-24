import styled from 'styled-components';
import {
  GHOST_WHITE,
  BORDER,
  ACTIVE,
  WHITE,
  PINK_SWAN,
  DARK_BLUE,
  LIGTH_RED,
  LIGTH_GHOST_WHITE
} from '../../../constants/colors';
import FONT_ROBOTO from '../../../constants/fonts';
import {
  SMALL_FONT_SIZE,
  MEDIUM_FONT_SIZE
} from '../../../constants/fontSizes';

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ACTIVE};
  margin-bottom: 20px;
`;

export const VitalsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${WHITE};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const VitalsTableHeader = styled.thead`
  background-color: ${ACTIVE};
  color: ${WHITE};
`;

export const VitalsTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${GHOST_WHITE};
  }

  &:hover {
    background-color: ${GHOST_WHITE};
  }
`;

export const VitalsTableCell = styled.td`
  padding: 16px;
  text-align: center;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  color: ${DARK_BLUE};
  border-bottom: 1px solid ${BORDER};

  &:first-child {
    text-align: left;
  }
`;

export const VitalsTableHeaderCell = styled.th`
  padding: 16px;
  text-align: center;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  color: ${WHITE};

  &:first-child {
    text-align: left;
  }
`;

export const AddVitalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: end;
  margin-top: 10px;
`;

export const AddButton = styled.button`
  padding: 0px 12px;
  font-family: ${FONT_ROBOTO};
  display: flex;
  align-items: center;
  text-align: center;
  border: 1.5px solid ${ACTIVE};
  justify-content: center;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  background: ${GHOST_WHITE};
  color: ${ACTIVE};
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${LIGTH_GHOST_WHITE};
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  border: 1.5px solid ${BORDER};
  border-radius: 8px;
  background: ${WHITE};
  color: ${DARK_BLUE};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${GHOST_WHITE};
    border-color: ${ACTIVE};
  }
`;

export const NoVitalsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${MEDIUM_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  color: ${PINK_SWAN};
  padding: 40px;
  text-align: center;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled.button`
  padding: 8px 16px;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  border: 1.5px solid ${ACTIVE};
  border-radius: 8px;
  background: ${WHITE};
  color: ${ACTIVE};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${ACTIVE};
    color: ${WHITE};
  }
`;

export const DeleteButton = styled.button`
  padding: 8px;
  font-family: ${FONT_ROBOTO};
  font-size: ${MEDIUM_FONT_SIZE};
  border: 1.5px solid ${LIGTH_RED};
  border-radius: 8px;
  background: ${WHITE};
  color: ${LIGTH_RED};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  &:hover {
    background-color: ${LIGTH_RED};
    color: ${WHITE};
  }
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  width: 100%;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
  background-color: ${WHITE};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${BORDER};
`;

export const ChartTitle = styled.h3`
  font-family: ${FONT_ROBOTO};
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${ACTIVE};
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;
