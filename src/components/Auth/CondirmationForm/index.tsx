import { useTranslation } from 'react-i18next';
import checkmark from '../../../assets/auth/checkmark.svg';
import {
  ArrowBack,
  AuthConfirmationContainer,
  AuthConfirmationImg,
  Container,
  Form,
  FormContainer,
  Link,
  LinkContainer,
  Text
} from '../../common/styles';
import { PATH } from '../../../constants/routes';

function ConfirmationForm() {
  const { t } = useTranslation();

  return (
    <Container>
      <FormContainer>
        <Form>
          <AuthConfirmationContainer>
            <AuthConfirmationImg src={checkmark} />
          </AuthConfirmationContainer>
          <Text>{t('Auth.confirmationText')}</Text>
          <LinkContainer>
            <Link to={PATH.SIGN_IN}>
              <ArrowBack />
              {t('Auth.backToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ConfirmationForm;
