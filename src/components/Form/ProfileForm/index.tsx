import { InputContainer, InputTitle, ConfirmButton } from '../../common/styles';
import Input from '../../Input';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserSchema from '../../../validation/user.validate';
import {
  address,
  birthDate,
  city,
  country,
  email,
  firstName,
  gender,
  lastName,
  phoneNumber,
  specialization
} from '../../../constants/inputName';
import { useTranslation } from 'react-i18next';
import { FormValues, Profile } from '../../common/types';
import { ButtonContainer, Form, InputInlineContainer, Text } from '../styles';
import PhoneInput from '../../Input/PhoneInput';
import SelectInput from '../../Input/SelectInput';
import {
  roles,
  useCountries,
  useGenders,
  useSpecializations
} from '../../../constants/mockData';
import CancelButton from '../../CancelButton';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useAppSelector } from '../../../redux/hooks';
import PhotoUpload from '../../PhotoUpload';
import { useUpdateUserMutation } from '../../../redux/services/userApi';
import { toast } from 'react-toastify';
import { useCheckEmailMutation } from '../../../redux/services/authApi';
import SelectDate from '../../SelectDate';

interface CheckEmailError {
  status: number;
}

const ProfileForm = () => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const countries = useCountries();

  const genders = useGenders();

  const { editUserProfileSchema } = UserSchema();

  const user = useAppSelector(selectUser);

  const [updateUser] = useUpdateUserMutation();

  const [checkEmail] = useCheckEmailMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm<Profile>({
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      birthDate: user?.birthDate,
      gender: user?.gender,
      country: user?.country,
      city: user?.city,
      address: user?.address,
      specialization: user?.specialization
    },
    resolver: yupResolver(editUserProfileSchema)
  });

  const handleReset = () => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      birthDate: user?.birthDate,
      gender: user?.gender,
      country: user?.country,
      city: user?.city,
      address: user?.address,
      specialization: user?.specialization
    });
  };

  const onSubmit = async (data: Profile) => {
    try {
      let authData = { ...data };

      if (data.email !== user?.email) {
        await checkEmail(data).unwrap();
      }
      if (data.phoneNumber !== user?.phoneNumber) {
        authData.phoneNumber = `+${data.phoneNumber}`;
      }

      await updateUser(authData).unwrap();
      toast.success(t('Profile.successUpdate'));
    } catch (error) {
      const err = error as CheckEmailError;
      if (err.status === 409) {
        toast.error(t('Error.existEmail'));
      } else {
        toast.error(t('Error.existPhoneNumber'));
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text>{t('Profile.edit')}</Text>
      <PhotoUpload />
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Profile.firstName')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={firstName}
            placeholder={t('Profile.enterFirstName')}
            helperText={errors.firstName?.message}
            error={Boolean(errors?.firstName)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Profile.lastName')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={lastName}
            placeholder={t('Profile.enterLastName')}
            helperText={errors.lastName?.message}
            error={Boolean(errors?.lastName)}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Profile.phoneNumber')}</InputTitle>
          <PhoneInput
            control={control as Control<FormValues>}
            fullWidth
            name={phoneNumber}
            placeholder={t('Profile.defaultPhoneNumber')}
            helperText={errors.phoneNumber?.message}
            error={Boolean(errors?.phoneNumber)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Profile.email')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={email}
            placeholder={t('Profile.enterEmail')}
            helperText={errors.email?.message}
            error={Boolean(errors?.email)}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Profile.birthDate')}</InputTitle>
          <SelectDate
            control={control as Control<FormValues>}
            name={birthDate}
            helperText={errors.birthDate?.message}
            error={Boolean(errors?.birthDate)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Profile.gender')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={gender}
            placeholder={t('Profile.enterGender')}
            helperText={errors.gender?.message}
            error={Boolean(errors?.gender)}
            options={genders}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Profile.country')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={country}
            placeholder={t('Profile.enterCountry')}
            helperText={errors.country?.message}
            error={Boolean(errors?.country)}
            options={countries}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Profile.city')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={city}
            placeholder={t('Profile.enterCity')}
            helperText={errors.city?.message}
            error={Boolean(errors?.city)}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Profile.address')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={address}
            placeholder={t('Profile.enterAddress')}
            helperText={errors.address?.message}
            error={Boolean(errors?.address)}
            required={true}
          />
        </InputContainer>
        {user?.role === roles.doctor ? (
          <InputContainer>
            <InputTitle>{t('Auth.specialization')}</InputTitle>
            <SelectInput
              control={control as Control<FormValues>}
              fullWidth
              name={specialization}
              placeholder={t('Auth.enterSpecialization')}
              options={specializations.filter((spec) => spec.value !== 0)}
              helperText={errors.specialization?.message}
              error={Boolean(errors?.specialization)}
              required={true}
            />
          </InputContainer>
        ) : (
          <> </>
        )}
      </InputInlineContainer>
      <ButtonContainer>
        <CancelButton
          onReset={handleReset}
          isDisabled={!isValid}
          title={'Profile.cancelTitle'}
        />
        <ConfirmButton
          disabled={!isValid}
          type="submit"
          value={t('Common.save')}
        />
      </ButtonContainer>
    </Form>
  );
};

export default ProfileForm;
