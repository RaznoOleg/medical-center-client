import styled, { css, keyframes } from 'styled-components';
import {
  DRAWER_CONT,
  ACTIVE,
  NOT_ACTIVE,
  ACTIVE_BACKGROUND,
  NOT_ACTIVE_BACKGROUND_HOVER,
  NOT_ACTIVE_HOVER,
  BORDER
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '../../constants/fontSizes';
import { NavLink } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 15.5vw;
  background-color: ${DRAWER_CONT};
  height: 100vh;
  border-right: 1px solid ${BORDER};
  padding: 12px;
  font-family: ${FONT_ROBOTO};
  z-index: 10;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const NavItemContainer = styled.div<{ selected?: boolean | string }>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  text-decoration: none;
  padding: 15px;
  color: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE)};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  background-color: ${({ selected }) => (selected ? ACTIVE_BACKGROUND : null)};
  &:hover {
    background-color: ${({ selected }) =>
      selected ? null : NOT_ACTIVE_BACKGROUND_HOVER};
    color: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE_HOVER)};
    svg {
      fill: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE_HOVER)};
    }
  }
  svg {
    margin-right: 15px;
    fill: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE)};
  }
  cursor: ${({ selected }) => (selected ? 'pointer' : 'pointer')};
  transition: 0.2s all;
  &:nth-child(2) {
    margin-top: 40px;
  }
  &:active {
    ${({ selected }) => !selected && 'transform: translateY(-7px);'}
  }
`;

export const NavItemContainerBlocked = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  text-decoration: none;
  padding: 15px;
  color: ${NOT_ACTIVE};
  opacity: 0.6;
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  svg {
    margin-right: 16px;
    fill: ${NOT_ACTIVE};
  }
  transition: 0.2s all;
  &:nth-child(2) {
    margin-top: 40px;
  }
`;

export const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  border-bottom: 1px solid ${BORDER};
`;
export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-bottom: 20px;
  margin-top: 20px;
`;

export const LanguageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.div`
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 700;
`;

export const UserSpeciality = styled.div`
  color: ${NOT_ACTIVE};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 500;
`;

export const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${BORDER};
  margin-right: 8px;
  background-color: white;
`;
