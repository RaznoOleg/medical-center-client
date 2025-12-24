import styled from 'styled-components';
import {
  GHOST_WHITE,
  BORDER,
  ACTIVE,
  WHITE,
  DARK_BLUE,
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

export const NoVitalsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${MEDIUM_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  color: ${DARK_BLUE};
  padding: 40px;
  text-align: center;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PredictionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${WHITE};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const PredictionsTableHeader = styled.thead`
  background-color: ${ACTIVE};
  color: ${WHITE};
`;

export const PredictionsTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${GHOST_WHITE};
  }

  &:hover {
    background-color: ${GHOST_WHITE};
  }
`;

export const PredictionsTableCell = styled.td`
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

export const PredictionsTableHeaderCell = styled.th`
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

export const RiskLevelBadge = styled.div<{ color: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: ${WHITE};
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
`;

export const SummaryList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  text-align: left;
`;

export const SummaryItem = styled.li`
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  color: ${DARK_BLUE};
  padding: 2px 0;
  line-height: 1.5;
  margin-bottom: 4px;
`;

export const PredictionCard = styled.div`
  width: 100%;
  max-width: 900px;
  background: linear-gradient(135deg, ${WHITE} 0%, ${GHOST_WHITE} 100%);
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border: 2px solid ${ACTIVE}20;
  margin: 20px auto;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const PredictionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, ${ACTIVE} 0%, #4a90e2 100%);
  padding: 20px 24px;
  color: ${WHITE};
  margin-bottom: 0;
`;

export const PredictionCardTitle = styled.h3`
  font-family: ${FONT_ROBOTO};
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: bold;
  color: ${WHITE};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PredictionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${WHITE};
`;

export const PredictionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px;
  background-color: ${GHOST_WHITE};
  border-radius: 10px;
  border-left: 4px solid ${ACTIVE};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${LIGTH_GHOST_WHITE};
  }
`;

export const PredictionLabel = styled.span`
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  color: ${DARK_BLUE};
  font-weight: 600;
  min-width: 200px;
`;

export const PredictionValue = styled.span`
  font-family: ${FONT_ROBOTO};
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${ACTIVE};
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 24px;
  color: ${WHITE};
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: bold;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

export const SummaryCard = styled.div`
  padding: 16px;
  background-color: ${GHOST_WHITE};
  border-radius: 10px;
  border-left: 4px solid ${ACTIVE};
  margin-top: 8px;
`;
