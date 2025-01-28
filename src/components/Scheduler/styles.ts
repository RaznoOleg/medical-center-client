import styled from 'styled-components';
import {
  LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
  NORMAL_FONT_SIZE,
  SMALL_FONT_SIZE
} from '../../constants/fontSizes';
import {
  BORDER,
  CORNFLOWER_BLUE,
  DRAWER_CONT,
  LIGHT_WHITE,
  LIGTH_PINK,
  NAVY_BLUE,
  NOT_ACTIVE,
  VERY_LIGHT_GREY,
  ZAMBEZI
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';

export const CalendarContainer = styled.div`
  .rbc-calendar {
    background-color: ${LIGHT_WHITE};
    height: 600px;
    font-family: ${FONT_ROBOTO};
    padding: 35px;
    border-radius: 16px;
    border: 1px solid ${BORDER};
  }
  .rbc-day-bg {
    cursor: pointer;
    &:hover {
      background-color: ${CORNFLOWER_BLUE};
      cursor: pointer;
    }
  }

  .rbc-calendar *,
  .rbc-calendar *:before,
  .rbc-calendar *:after {
    box-sizing: inherit;
  }

  .rbc-month-view {
    border: 1px solid ${BORDER};
    border-radius: 4px;
  }
  .rbc-events-container:hover {
    cursor: pointer;
  }

  .rbc-timeslot-group:hover {
    cursor: none;
  }

  .rbc-toolbar {
    font-size: ${MEDIUM_FONT_SIZE};
    margin-bottom: 30px;
  }

  .rbc-toolbar-label {
    font-size: ${LARGE_FONT_SIZE};
  }

  .rbc-event {
    background-color: ${NAVY_BLUE};
    text-align: center;

    :focus {
      background-color: ${ZAMBEZI};
    }
  }

  .rbc-event:hover {
    background-color: ${NOT_ACTIVE};
  }

  .rbc-time-content {
    .rbc-event:hover {
      background-color: ${NOT_ACTIVE};
    }
    .rbc-selected {
      background-color: ${NAVY_BLUE};
    }
  }
  .rbc-event-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rbc-event-label {
    display: none;
  }

  .rbc-header {
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    height: fit-content;
    font-size: ${MEDIUM_FONT_SIZE};
    border-bottom: 1px solid ${BORDER};
  }

  .rbc-agenda-content {
    height: 50px;
    font-size: ${MEDIUM_FONT_SIZE};
  }

  .rbc-agenda-event-cell:hover {
    background-color: ${VERY_LIGHT_GREY};
    cursor: pointer;
  }

  .rbc-btn-group button {
    cursor: pointer;
    font-size: ${NORMAL_FONT_SIZE};
  }

  .rbc-button-link {
    font-size: ${SMALL_FONT_SIZE};
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left: 1px solid ${BORDER};
  }

  .rbc-time-view .rbc-allday-cell {
    height: fit-content;
    cursor: pointer;
  }

  .rbc-month-row + .rbc-month-row {
    border-top: 1px solid ${BORDER};
  }

  .rbc-header + .rbc-header {
    border-left: 1px solid ${BORDER};
  }

  .rbc-off-range-bg {
    background: ${DRAWER_CONT};
  }

  .rbc-today {
    background-color: ${LIGTH_PINK};
  }

  .rbc-day-slot .rbc-event {
    border: 1px solid ${BORDER};
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    vertical-align: middle;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    text-align: center;
  }

  .rbc-time-view .rbc-row {
    box-sizing: border-box;
    min-height: 10px;
  }

  .rbc-row {
    cursor: pointer;
  }

  .rbc-agenda-view {
    overflow: hidden;
  }
`;
