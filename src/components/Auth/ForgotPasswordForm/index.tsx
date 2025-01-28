import { useTranslation } from 'react-i18next';
import { Control, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { email } from '../../../constants/inputName';
import { PATH } from '../../../constants/routes';
import {
  FormContainer,
  Title,
  InputContainer,
  Container,
  InputTitle,
  ConfirmButton,
  LinkContainer,
  ArrowBack,
  Text,
  Form,
  Link,
  ButtonContainer,
  LoaderWrapper
} from '../../common/styles';
import { AuthForgotPassword, FormValues } from '../../common/types';
import Input from '../../Input';
import AuthSchema from '../../../validation/auth.validate';
import { useForgotPasswordMutation } from '../../../redux/services/authApi';
import { useEffect, useState } from 'react';
import Loader from '../../Loader';

function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { forgotPasswordSchema } = AuthSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<AuthForgotPassword>({
    mode: 'onChange',
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(forgotPasswordSchema)
  });

  const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (data: AuthForgotPassword) => {
    try {
      setIsLoading(true);
      await forgotPassword(data).unwrap();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(t('Error.notExistEmail'), { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Auth.sendingRecoveryLink'));
      navigate(PATH.CONFIRM);
    }
  });

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.forgotPasswordTitle')}</Title>
          <Text>{t('Auth.forgotPasswordText')}</Text>
          <InputContainer>
            <InputTitle>{t('Auth.email')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name={email}
              placeholder={t('Auth.enterEmail')}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </InputContainer>
          <ButtonContainer>
            <ConfirmButton
              disabled={!isValid}
              type="submit"
              value={t('Auth.submit')}
            />
          </ButtonContainer>
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

export default ForgotPasswordForm;
