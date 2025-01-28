import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import visible from '../../../assets/auth/eye.svg';
import visibleOff from '../../../assets/auth/eyeSlash.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { AuthResetPassword, FormValues } from '../../common/types';
import {
  Container,
  Form,
  FormContainer,
  GreenText,
  InputContainer,
  InputTitle,
  PasswordImg,
  ConfirmButton,
  Title,
  ButtonContainer
} from '../../common/styles';
import Input from '../../Input';
import { confirmPassword, end, password } from '../../../constants/inputName';
import AuthSchema from '../../../validation/auth.validate';
import { useResetPasswordMutation } from '../../../redux/services/authApi';
import { PATH } from '../../../constants/routes';

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { resetPasswordSchema } = AuthSchema();

  const navigate = useNavigate();

  const { token } = useParams();

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<AuthResetPassword>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: ''
    },

    resolver: yupResolver(resetPasswordSchema)
  });

  const [resetPassword, { isSuccess }] = useResetPasswordMutation();

  const onSubmit = async (data: AuthResetPassword) => {
    try {
      if (token) {
        await resetPassword({
          password: data.password,
          encodedToken: token
        }).unwrap();
      }
    } catch (error) {
      toast.error(t('Error.smtWentWrong'), { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Auth.successResetPassword'));
      navigate(PATH.HOME);
    }
  });

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.resetPasswordTitle')}</Title>
          <GreenText>{t('Auth.resetPasswordText')}</GreenText>
          <InputContainer>
            <InputTitle>{t('Auth.createNewPassword')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterNewPassword')}
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
          <InputContainer>
            <InputTitle>{t('Auth.confirmNewPassword')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name={confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterConfirmNewPassword')}
              helperText={errors.confirmPassword?.message}
              error={Boolean(errors?.confirmPassword)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    <InputAdornment position={end}>
                      {
                        <PasswordImg
                          src={showConfirmPassword ? visible : visibleOff}
                        />
                      }
                    </InputAdornment>
                  </IconButton>
                )
              }}
            />
          </InputContainer>
          <ButtonContainer>
            <ConfirmButton
              disabled={!isValid}
              type="submit"
              value={t('Auth.save')}
            />
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ResetPasswordForm;
