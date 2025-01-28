import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import checkmark from '../../../assets/auth/checkmark.svg';
import emotionSad from '../../../assets/auth/emotionSad.svg';
import { PATH } from '../../../constants/routes';
import {
  FormContainer,
  AuthConfirmationContainer,
  AuthConfirmationImg,
  LinkContainer,
  ArrowBack,
  Container,
  Text,
  Form,
  Link,
  LoaderWrapper
} from '../../common/styles';
import { useVerifyAccountQuery } from '../../../redux/services/authApi';
import Loader from '../../Loader';

function VerificationForm() {
  const { t } = useTranslation();

  const { link } = useParams<{ link: string }>();

  const { isLoading, isError } = useVerifyAccountQuery({ link });

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Container>
      <FormContainer>
        <Form>
          <AuthConfirmationContainer>
            {!isError ? (
              <>
                <AuthConfirmationImg src={checkmark} />
                <Text>{t('Auth.verificationText')}</Text>
              </>
            ) : (
              <>
                <AuthConfirmationImg src={emotionSad} />
                <Text>{t('Auth.verificationTextError')}</Text>
              </>
            )}
          </AuthConfirmationContainer>
          <LinkContainer>
            <Link to={PATH.SIGN_IN}>
              <ArrowBack />
              {t('Auth.goToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default VerificationForm;
