import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FormValues, Patient } from '../../../common/types';
import {
  ButtonContainer,
  Form,
  InputInlineContainer,
  Text
} from '../../styles';
import {
  ConfirmButton,
  InputContainer,
  InputTitle,
  LoaderWrapper
} from '../../../common/styles';
import Input from '../../../Input';
import {
  address,
  birthDate,
  city,
  country,
  email,
  firstName,
  gender,
  lastName,
  overview,
  phoneNumber
} from '../../../../constants/inputName';
import PhoneInput from '../../../Input/PhoneInput';
import SelectInput from '../../../Input/SelectInput';
import { useCountries, useGenders } from '../../../../constants/mockData';
import CancelButton from '../../../CancelButton';
import PatientSchema from '../../../../validation/patient.validate';
import { defaulPhoneNumber } from '../../../../constants/other';
import {
  useCheckPatientEmailMutation,
  useCreatePatientMutation
} from '../../../../redux/services/patientApi';
import Loader from '../../../Loader';
import { useEffect, useState } from 'react';
import { PATH } from '../../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import SelectDate from '../../../SelectDate';

interface CheckPatientEmailError {
  status: number;
}

const CreatePatientForm = () => {
  const { t } = useTranslation();

  const genders = useGenders();

  const countries = useCountries();

  const { createPatientSchema } = PatientSchema();

  const [createPatient, { isSuccess }] = useCreatePatientMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [checkPatientEmail] = useCheckPatientEmailMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm<Patient>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      birthDate: '',
      gender: '',
      country: '',
      city: '',
      address: '',
      overview: ''
    },
    resolver: yupResolver(createPatientSchema)
  });

  const handleReset = () => {
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: defaulPhoneNumber,
      email: '',
      birthDate: '',
      gender: '',
      country: '',
      city: '',
      address: '',
      overview: ''
    });
  };

  const onSubmit = async (data: Patient) => {
    try {
      await checkPatientEmail(data).unwrap();

      const patientData = {
        ...data,
        phoneNumber: `+${data.phoneNumber}`
      };

      setIsLoading(true);
      await createPatient(patientData).unwrap();
      setIsLoading(false);
    } catch (error) {
      const err = error as CheckPatientEmailError;
      setIsLoading(false);
      if (err.status === 409) {
        toast.error(t('Error.existPatientEmail'));
      } else {
        toast.error(t('Error.existPatientPhoneNumber'));
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Patient.successCreatePatient'));
      navigate(PATH.PATIENTS);
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text>{t('Patient.createPatientCard')}</Text>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Patient.firstName')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={firstName}
            placeholder={t('Patient.enterFirstName')}
            helperText={errors.firstName?.message}
            error={Boolean(errors?.firstName)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Patient.lastName')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={lastName}
            placeholder={t('Patient.enterLastName')}
            helperText={errors.lastName?.message}
            error={Boolean(errors?.lastName)}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Patient.phoneNumber')}</InputTitle>
          <PhoneInput
            control={control as Control<FormValues>}
            fullWidth
            name={phoneNumber}
            placeholder={t('Patient.defaultPhoneNumber')}
            helperText={errors.phoneNumber?.message}
            error={Boolean(errors?.phoneNumber)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Patient.email')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={email}
            placeholder={t('Patient.enterEmail')}
            helperText={errors.email?.message}
            error={Boolean(errors?.email)}
            required={true}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Patient.birthDate')}</InputTitle>
          <SelectDate
            control={control as Control<FormValues>}
            name={birthDate}
            helperText={errors.birthDate?.message}
            error={Boolean(errors?.birthDate)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Patient.gender')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={gender}
            placeholder={t('Patient.enterGender')}
            helperText={errors.gender?.message}
            error={Boolean(errors?.gender)}
            options={genders}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Patient.country')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={country}
            placeholder={t('Patient.enterCountry')}
            helperText={errors.country?.message}
            error={Boolean(errors?.country)}
            options={countries}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Patient.city')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={city}
            placeholder={t('Patient.enterCity')}
            helperText={errors.city?.message}
            error={Boolean(errors?.city)}
          />
        </InputContainer>
      </InputInlineContainer>
      <InputInlineContainer>
        <InputContainer>
          <InputTitle>{t('Patient.address')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={address}
            placeholder={t('Patient.enterAddress')}
            helperText={errors.address?.message}
            error={Boolean(errors?.address)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Patient.overview')}</InputTitle>
          <Input
            control={control as Control<FormValues>}
            fullWidth
            name={overview}
            placeholder={t('Patient.enterOverview')}
            helperText={errors.overview?.message}
            error={Boolean(errors?.overview)}
          />
        </InputContainer>
      </InputInlineContainer>
      <ButtonContainer>
        <CancelButton
          onReset={handleReset}
          isDisabled={false}
          title={'Profile.cancelTitle'}
        />
        <ConfirmButton
          disabled={!isValid}
          type="submit"
          value={t('Common.create')}
        />
      </ButtonContainer>
    </Form>
  );
};

export default CreatePatientForm;
