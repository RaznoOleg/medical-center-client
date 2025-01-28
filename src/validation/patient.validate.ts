import * as yup from 'yup';
import { EMAIL_PATTERN } from '../constants/validation';
import { useTranslation } from 'react-i18next';

export default function PatientSchema() {
  const { t } = useTranslation();

  const createPatientSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('Error.firstNameRequired'))
      .min(3, t('Error.tooShort')),
    lastName: yup
      .string()
      .required(t('Error.lastNameRequired'))
      .min(3, t('Error.tooShort')),
    email: yup
      .string()
      .matches(EMAIL_PATTERN, t('Error.invalidEmailFormat'))
      .required(t('Error.emailRequired')),
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired'))
      .min(10, t('Error.tooShort'))
  });

  const editPatientSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('Error.firstNameRequired'))
      .min(3, t('Error.tooShort')),
    lastName: yup
      .string()
      .required(t('Error.lastNameRequired'))
      .min(3, t('Error.tooShort')),
    email: yup
      .string()
      .matches(EMAIL_PATTERN, t('Error.invalidEmailFormat'))
      .required(t('Error.emailRequired')),
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired'))
      .min(10, t('Error.tooShort'))
  });

  return {
    createPatientSchema,
    editPatientSchema
  };
}
