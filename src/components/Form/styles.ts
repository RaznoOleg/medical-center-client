import styled from 'styled-components';
import { NAVY_BLUE, CORNFLOWER_BLUE, BORDER } from '../../constants/colors';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '../../constants/fontSizes';
import FONT_ROBOTO from '../../constants/fonts';

export const Form = styled.form`
  margin: 15px 35px 15px 35px;
`;

export const Text = styled.div`
  font-size: ${NORMAL_FONT_SIZE};
  text-align: start;
  font-weight: bold;
  font-family: ${FONT_ROBOTO};
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const InputInlineContainer = styled.div`
  display: grid;
  justify-content: space-between;
  padding-bottom: 20px;
  gap: 4em;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1.5px solid ${BORDER};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-right: auto;
  margin-left: auto;
`;

export const PatientInfoWrapper = styled.div`
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
`;

export const SelectContainer = styled.div`
  margin: 0px 200px;
`;
