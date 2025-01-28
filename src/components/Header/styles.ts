import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.div`
  padding: 20px 40px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const LinkToLogin = styled(NavLink)`
  text-decoration: none;
  width: 40%;
`;
