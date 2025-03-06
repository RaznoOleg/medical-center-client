import { useTranslation } from 'react-i18next';
import { Control, useForm } from 'react-hook-form';
import { AuthSignUpSecondStep, FormValues } from '../../../common/types';
import AuthSchema from '../../../../validation/auth.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  address,
  birthDate,
  city,
  country,
  gender,
  phoneNumber,
  role,
  specialization
} from '../../../../constants/inputName';
import {
  Container,
  Form,
  FormContainer,
  InputContainer,
  InputInlineContainer,
  InputTitle,
  Link,
  LinkContainer,
  ConfirmButton,
  Text,
  Title,
  LoaderWrapper,
  ButtonContainer
} from '../../../common/styles';
import {
  roles,
  useCountries,
  useGenders,
  useRolesOptions,
  useSpecializations
} from '../../../../constants/mockData';
import { PATH } from '../../../../constants/routes';
import SelectInput from '../../../Input/SelectInput';
import Input from '../../../Input';
import PhoneInput from '../../../Input/PhoneInput';
import { selectAuthData } from '../../../../redux/features/selectors/authSelector';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { useSignUpMutation } from '../../../../redux/services/authApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../../redux/features/slices/authSlice';
import Loader from '../../../Loader';
import { jwtDecode } from 'jwt-decode';
import { AuthSignUpData } from '../../../../redux/types/auth.type';
import { userApi } from '../../../../redux/services/userApi';
import SelectDate from '../../../SelectDate';

function SignUpSecondStepForm() {
  const { t } = useTranslation();

  const rolesOptions = useRolesOptions();

  const specializations = useSpecializations();

  const countries = useCountries();

  const genders = useGenders();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { signUpSecondStepSchema } = AuthSchema();

  const authDataFromFirstStep = useAppSelector(selectAuthData);

  const queryParams = new URLSearchParams(window.location.search);

  const userInfo = queryParams.get('userInfo');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<AuthSignUpSecondStep>({
    mode: 'onChange',
    defaultValues: {
      role: '',
      gender: '',
      phoneNumber: '',
      city: '',
      country: '',
      birthDate: '',
      address: ''
    },

    resolver: yupResolver(signUpSecondStepSchema)
  });

  const selectedRole = watch(role);

  const [signUp, { data, isSuccess, isLoading }] = useSignUpMutation();

  const onSubmit = async (data: AuthSignUpSecondStep) => {
    try {
      const authDataFromSecondStep = {
        ...data,
        phoneNumber: `+${data.phoneNumber}`
      };

      let authData;

      if (userInfo) {
        const decodedUserInfo: AuthSignUpData = jwtDecode(userInfo);
        const authDataFromGoogle = {
          firstName: decodedUserInfo.firstName,
          lastName: decodedUserInfo.lastName,
          email: decodedUserInfo.email,
          photoUrl: decodedUserInfo.photoUrl,
          isVerified: decodedUserInfo.isVerified,
          password: null
        };

        authData = Object.assign(
          {},
          authDataFromGoogle,
          authDataFromSecondStep
        );
      } else {
        authData = Object.assign(
          {},
          authDataFromFirstStep,
          authDataFromSecondStep
        );
      }
      dispatch(userApi.util.invalidateTags(['user']));
      await signUp(authData).unwrap();
    } catch (error) {
      toast.error(t('Error.existPhoneNumber'), { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Auth.successSignUp'));
      dispatch(setAuthToken(data));
      navigate(PATH.PROFILE);
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
          <Title>{t('Auth.registrationTitle')}</Title>
          <Text>{t('Auth.registrationText')}</Text>
          <InputContainer>
            <InputTitle>{t('Auth.role')}</InputTitle>
            <SelectInput
              control={control as Control<FormValues>}
              fullWidth
              name={role}
              placeholder={t('Auth.enterRole')}
              helperText={errors.role?.message}
              error={Boolean(errors?.role)}
              options={rolesOptions}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.specialization')}</InputTitle>
            <SelectInput
              control={control as Control<FormValues>}
              fullWidth
              name={specialization}
              placeholder={t('Auth.enterSpecialization')}
              options={
                selectedRole === roles.admin
                  ? specializations.filter((spec) => spec.value === 0)
                  : specializations.filter((spec) => spec.value !== 0)
              }
              helperText={errors.specialization?.message}
              error={Boolean(errors?.specialization)}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.gender')}</InputTitle>
            <SelectInput
              control={control as Control<FormValues>}
              fullWidth
              name={gender}
              placeholder={t('Auth.enterGender')}
              helperText={errors.gender?.message}
              error={Boolean(errors?.gender)}
              options={genders}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.phoneNumber')}</InputTitle>
            <PhoneInput
              control={control as Control<FormValues>}
              fullWidth
              name={phoneNumber}
              placeholder={t('Auth.defaultPhoneNumber')}
              helperText={errors.phoneNumber?.message}
              error={Boolean(errors?.phoneNumber)}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.birthDate')}</InputTitle>
            <SelectDate
              control={control as Control<FormValues>}
              name={birthDate}
              helperText={errors.birthDate?.message}
              error={Boolean(errors?.birthDate)}
              required={true}
            />
          </InputContainer>
          <InputInlineContainer>
            <InputContainer>
              <InputTitle>{t('Auth.country')}</InputTitle>
              <SelectInput
                control={control as Control<FormValues>}
                fullWidth
                name={country}
                placeholder={t('Auth.enterCountry')}
                helperText={errors.country?.message}
                error={Boolean(errors?.country)}
                options={countries}
                required={true}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>{t('Auth.city')}</InputTitle>
              <Input
                control={control as Control<FormValues>}
                fullWidth
                name={city}
                placeholder={t('Auth.enterCity')}
                helperText={errors.city?.message}
                error={Boolean(errors?.city)}
                required={true}
              />
            </InputContainer>
          </InputInlineContainer>
          <InputContainer>
            <InputTitle>{t('Auth.address')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name={address}
              placeholder={t('Auth.enterAddress')}
              helperText={errors.address?.message}
              error={Boolean(errors?.address)}
              required={true}
            />
          </InputContainer>
          <ButtonContainer>
            <ConfirmButton
              disabled={!isValid}
              type="submit"
              value={t('Auth.signUp')}
            />
          </ButtonContainer>
          <LinkContainer>
            {t('Auth.alreadyExistText')}
            <Link to={PATH.SIGN_IN}>{t('Auth.click')}</Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default SignUpSecondStepForm;
