import { useTranslation } from 'react-i18next';
import googleLogo from '../../../assets/auth/googleLogo.svg';
import {
  AuthGoogleContainer,
  GoogleImg,
  GoogleText
} from '../../common/styles';

function GoogleButton() {
  const { t } = useTranslation();

  return (
    <AuthGoogleContainer
      href={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_GOOGLE_ROUTE}`}
    >
      <GoogleImg src={googleLogo} />
      <GoogleText>{t('Auth.continueWithGoogle')}</GoogleText>
    </AuthGoogleContainer>
  );
}

export default GoogleButton;
