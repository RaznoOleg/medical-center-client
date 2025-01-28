import React, { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import visible from '../../../assets/auth/eye.svg';
import visibleOff from '../../../assets/auth/eyeSlash.svg';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { email, end, password } from '../../../constants/inputName';
import {
  AuthForgotPasswordContainer,
  Container,
  Form,
  FormContainer,
  InputContainer,
  InputTitle,
  Link,
  LinkContainer,
  PasswordImg,
  ConfirmButton,
  Text,
  Title,
  ButtonContainer
} from '../../common/styles';
import Input from '../../Input';
import AuthSchema from '../../../validation/auth.validate';
import { PATH } from '../../../constants/routes';
import { AuthSignIn, FormValues } from '../../common/types';
import { useSignInMutation } from '../../../redux/services/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { setAuthToken } from '../../../redux/features/slices/authSlice';
import GoogleButton from '../GoogleButton';
import { userApi } from '../../../redux/services/userApi';

function SignInForm() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { signInSchema } = AuthSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<AuthSignIn>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInSchema)
  });

  const [signIn, { data, isSuccess }] = useSignInMutation();

  const onSubmit = async (data: AuthSignIn) => {
    try {
      dispatch(userApi.util.invalidateTags(['user']));
      await signIn(data).unwrap();
    } catch (error) {
      toast.error(t('Error.checkInputData'), { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Auth.successSignIn'));
      dispatch(setAuthToken(data));
      navigate(PATH.PROFILE);
    }
  });

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.loginTitle')}</Title>
          <Text>{t('Auth.loginText')}</Text>
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
          <InputContainer>
            <InputTitle>{t('Auth.passwordLogin')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterPassword')}
              helperText={errors.password?.message}
              error={Boolean(errors?.password)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    <InputAdornment position={end}>
                      {
                        <PasswordImg
                          src={showPassword ? visible : visibleOff}
                        />
                      }
                    </InputAdornment>
                  </IconButton>
                )
              }}
            />
          </InputContainer>
          <AuthForgotPasswordContainer>
            <Link to={PATH.FORGOT_PASS}>{t('Auth.forgotPasswordLink')}</Link>
          </AuthForgotPasswordContainer>
          <ButtonContainer>
            <GoogleButton />
            <ConfirmButton
              disabled={!isValid}
              type="submit"
              value={t('Auth.continue')}
            />
          </ButtonContainer>
          <LinkContainer>
            {t('Auth.haventAnAccount')}
            <Link to={PATH.SIGN_UP}>{t('Auth.click')}</Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default SignInForm;
