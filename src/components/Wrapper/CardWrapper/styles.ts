import styled from 'styled-components';
import {
  BLACK,
  ZAMBEZI,
  BORDER,
  NAVY_BLUE,
  ACTIVE
} from '../../../constants/colors';
import { SMALL_FONT_SIZE } from '../../../constants/fontSizes';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
`;

export const Arrow = styled.div<{ toggle: string }>`
  border: solid ${BLACK};
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 8px;
  margin-top: ${(props) =>
    props.toggle.toString() === 'true' ? '-3px' : '10px'};
  color: ${BLACK};
  transition: 0.5s all;
  transform: rotate(
    ${(props) => (props.toggle.toString() === 'true' ? '45deg' : '-135deg')}
  );
  -webkit-transform: rotate(
    ${(props) => (props.toggle.toString() === 'true' ? '45deg' : '-135deg')}
  );
`;

export const PatientName = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  color: ${ZAMBEZI};
  font-size: ${SMALL_FONT_SIZE};
`;

export const AccordionBody = styled.div<{
  toggle: string;
  ref?: React.RefObject<HTMLDivElement>;
}>`
  border-top: ${(props) =>
    props.toggle.toString() === 'true' ? `1px solid ${BORDER}` : null};
  margin-top: ${(props) =>
    props.toggle.toString() === 'true' ? '20px' : null};
  font-size: ${SMALL_FONT_SIZE};
`;

export const EditCardLink = styled(NavLink)`
  margin-left: auto;
  font-weight: 700;
  text-decoration: none;
  font-size: ${SMALL_FONT_SIZE};
  color: ${ACTIVE};

  &:hover {
    transition: all 0.4s ease-out;
    color: ${NAVY_BLUE};
  }
`;
