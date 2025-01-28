import styled, { css, keyframes } from 'styled-components';
import {
  GHOST_WHITE,
  WHISPER,
  VERY_LIGHT_GREY,
  BLACK,
  LIGHT_GREEN,
  DARK_GREEN,
  ZAMBEZI,
  PINK_SWAN,
  WHITE,
  NAVY_BLUE,
  CORNFLOWER_BLUE,
  GREY,
  WARNING,
  BORDER
} from '../../constants/colors';
import FONT_ROBOTO from '../../constants/fonts';
import {
  LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
  NORMAL_FONT_SIZE,
  SMALL_FONT_SIZE
} from '../../constants/fontSizes';
import { NavLink } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  width: 100%;
  align-items: center;
`;

export const ItemContainer = styled.div`
  background: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  padding: 20px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const ItemsList = styled.ul`
  margin-top: 16px;
  font-family: ${FONT_ROBOTO};
  padding-left: 0px;
`;

export const NotFound = styled.div`
  color: ${PINK_SWAN};
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  text-align: center;
  margin-top: 40px;
`;

export const SearchForm = styled.form`
  text-align: center;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormContainer = styled.div`
  width: 70%;
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${WHISPER};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  box-shadow: 0 0 50px ${VERY_LIGHT_GREY};
`;

export const Title = styled.h1`
  color: ${BLACK};
  margin-top: 45px;
  margin-bottom: 35px;
  font-family: ${FONT_ROBOTO};
  text-align: center;
`;

export const PageTitle = styled.h1`
  color: ${BLACK};
  margin-bottom: 35px;
  font-size: ${LARGE_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  text-align: center;
`;

export const Text = styled.div`
  font-size: ${MEDIUM_FONT_SIZE};
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: ${FONT_ROBOTO};
`;

export const GreenText = styled.div`
  background: ${LIGHT_GREEN};
  color: ${DARK_GREEN};
  font-size: ${MEDIUM_FONT_SIZE};
  margin-left: auto;
  margin-right: auto;
  padding: 10px 36px;
  text-align: center;
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: ${FONT_ROBOTO};
  margin-bottom: 8px;
`;

export const InputTitle = styled.div`
  color: ${ZAMBEZI};
  font-size: ${NORMAL_FONT_SIZE};
  line-height: 20px;
  padding-top: 20px;
  padding-bottom: 5px;
`;

export const Form = styled.form`
  width: 40%;
  margin-bottom: 30px;
`;

export const PasswordImg = styled.img`
  width: 30px;
  height: 30px;
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

export const AuthGoogleContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  border: 2px solid ${WHISPER};
  height: 55px;
  width: 45%;
  margin-top: 20px;
  background-color: ${WHITE};
  color: ${BLACK};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: ${NAVY_BLUE};
    color: ${WHITE};
    border-color: ${BLACK};
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GoogleImg = styled.img`
  height: 30px;
  padding-left: 20px;
`;

export const GoogleText = styled.span`
  text-align: center;
  padding-right: 20px;
`;

export const LinkContainer = styled.div`
  text-align: center;
  padding-top: 10px;
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-top: 20px;
`;

export const Link = styled(NavLink)`
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: 22px;
  color: ${BLACK};
  text-decoration: none;

  &:hover {
    color: ${NAVY_BLUE};

    & > i {
      border: solid ${NAVY_BLUE};
      display: inline-block;
      border-width: 0 2px 2px 0;
    }
  }
`;

export const InputInlineContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 1em;
  grid-template-columns: 1fr 1fr;
`;

export const ArrowBack = styled.i`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  margin-right: 7px;

  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export const AuthForgotPasswordContainer = styled.div`
  text-align: end;
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-top: 15px;
`;

export const AuthConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

export const AuthConfirmationImg = styled.img``;

export const AddButton = styled(NavLink)`
  width: 10%;
  padding: 0px 12px;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  margin-left: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  justify-content: center;
  margin-right: 0px;
  border-radius: 8px;
  background: ${PINK_SWAN};
  color: ${WHITE};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    transition: all 0.2s ease-out;
    background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  }
`;

export const NoEvents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${MEDIUM_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  color: ${GREY};
  border-radius: 8px;
  height: 60px;
  background-color: ${WARNING};

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;

export const LoadMoreButton = styled.button`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 55px;
  width: 15%;
  margin-top: 20px;
  color: ${WHITE};
  font-size: ${SMALL_FONT_SIZE};
  background: ${PINK_SWAN};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  }
`;
