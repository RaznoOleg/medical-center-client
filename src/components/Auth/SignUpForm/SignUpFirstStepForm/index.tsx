import { useTranslation } from 'react-i18next';
import visible from '../../../../assets/auth/eye.svg';
import visibleOff from '../../../../assets/auth/eyeSlash.svg';
import { toast } from 'react-toastify';
import {
  firstName,
  lastName,
  email,
  password,
  end,
  confirmPassword
} from '../../../../constants/inputName';
import { PATH } from '../../../../constants/routes';
import {
  FormContainer,
  Title,
  InputContainer,
  InputTitle,
  PasswordImg,
  ConfirmButton,
  LinkContainer,
  Container,
  Text,
  Link,
  Form,
  ButtonContainer
} from '../../../common/styles';
import Input from '../../../Input';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import AuthSchema from '../../../../validation/auth.validate';
import { AuthSignUpFirstStep, FormValues } from '../../../common/types';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../../redux/hooks';
import { setSignUpFirstStepData } from '../../../../redux/features/slices/authSlice';
import SignUpSecondStepForm from '../SignUpSecondStepForm';
import { useCheckEmailMutation } from '../../../../redux/services/authApi';
import GoogleButton from '../../GoogleButton';

function SignUpFirstStepForm() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isFirstStep, setFirstStep] = useState<boolean>(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { signUpFirstStepSchema } = AuthSchema();

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<AuthSignUpFirstStep>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(signUpFirstStepSchema)
  });

  const [checkEmail] = useCheckEmailMutation();

  const onSubmit = async (data: AuthSignUpFirstStep) => {
    try {
      await checkEmail(data).unwrap();
      dispatch(setSignUpFirstStepData(data));
      setFirstStep(!isFirstStep);
    } catch (error) {
      toast.error(t('Error.existEmail'), { position: 'top-center' });
    }
  };

  return (
    <>
      {isFirstStep ? (
        <Container>
          <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title>{t('Auth.registrationTitle')}</Title>
              <Text>{t('Auth.registrationText')}</Text>
              <InputContainer>
                <InputTitle>{t('Auth.firstName')}</InputTitle>
                <Input
                  control={control as Control<FormValues>}
                  fullWidth
                  name={firstName}
                  placeholder={t('Auth.enterFirstName')}
                  helperText={errors.firstName?.message}
                  error={Boolean(errors?.firstName)}
                  required={true}
                />
              </InputContainer>
              <InputContainer>
                <InputTitle>{t('Auth.lastName')}</InputTitle>
                <Input
                  control={control as Control<FormValues>}
                  fullWidth
                  name={lastName}
                  placeholder={t('Auth.enterLastName')}
                  helperText={errors.lastName?.message}
                  error={Boolean(errors?.lastName)}
                  required={true}
                />
              </InputContainer>
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
                <InputTitle>{t('Auth.createPassword')}</InputTitle>
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
              <InputContainer>
                <InputTitle>{t('Auth.confirmPassword')}</InputTitle>
                <Input
                  control={control as Control<FormValues>}
                  fullWidth
                  name={confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('Auth.enterConfirmPassword')}
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
                <GoogleButton />
                <ConfirmButton
                  disabled={!isValid}
                  type="submit"
                  value={t('Auth.continue')}
                />
              </ButtonContainer>
              <LinkContainer>
                {t('Auth.alreadyExistText')}
                <Link to={PATH.SIGN_IN}>{t('Auth.click')}</Link>
              </LinkContainer>
            </Form>
          </FormContainer>
        </Container>
      ) : (
        <SignUpSecondStepForm />
      )}
    </>
  );
}

export default SignUpFirstStepForm;
