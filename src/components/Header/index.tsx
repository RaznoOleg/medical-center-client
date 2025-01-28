import { PATH } from '../../constants/routes';
import Logo from '../Logo';
import { HeaderContainer, LinkToLogin } from './styles';
import LanguageSwitcher from '../LanguageSwitcher';

function Header() {
  return (
    <HeaderContainer>
      <LinkToLogin to={PATH.SIGN_IN}>
        <Logo />
      </LinkToLogin>
      <LanguageSwitcher isHeader={true} />
    </HeaderContainer>
  );
}
export default Header;
