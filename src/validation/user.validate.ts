import * as yup from 'yup';
import { EMAIL_PATTERN } from '../constants/validation';
import { useTranslation } from 'react-i18next';

export default function UserSchema() {
  const { t } = useTranslation();

  const editUserProfileSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('Error.firstNameRequired'))
      .min(2, t('Error.tooShort')),
    lastName: yup
      .string()
      .required(t('Error.lastNameRequired'))
      .min(2, t('Error.tooShort')),
    email: yup
      .string()
      .matches(EMAIL_PATTERN, t('Error.invalidEmailFormat'))
      .required(t('Error.emailRequired')),
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired'))
      .min(10, t('Error.tooShort')),
    city: yup.string().required(t('Error.fieldRequired')),
    country: yup.string().required(t('Error.fieldRequired')),
    gender: yup.string().required(t('Error.fieldRequired')),
    address: yup.string().required(t('Error.fieldRequired')),
    birthDate: yup.string().required(t('Error.fieldRequired')),
    specialization: yup.number().required(t('Error.fieldRequired'))
  });

  return {
    editUserProfileSchema
  };
}
