import * as yup from 'yup';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  PASSWORD_REQUIRED_LENGTH
} from '../constants/validation';
import { useTranslation } from 'react-i18next';

export default function AuthSchema() {
  const { t } = useTranslation();

  const signUpFirstStepSchema = yup.object().shape({
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
    password: yup
      .string()
      .required(t('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain')} ${PASSWORD_REQUIRED_LENGTH} ${t(
          'Error.charactersUppercaseLowercase'
        )}`
      ),
    confirmPassword: yup
      .string()
      .required(t('Error.confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('Error.passwordsDoesNotMatch'))
  });

  const signUpSecondStepSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired'))
      .min(10, t('Error.tooShort')),
    address: yup.string().required(t('Error.fieldRequired')),
    city: yup.string().required(t('Error.fieldRequired')),
    country: yup.string().required(t('Error.fieldRequired')),
    gender: yup.string().required(t('Error.fieldRequired')),
    birthDate: yup.string().required(t('Error.fieldRequired')),
    specialization: yup.number().required(t('Error.fieldRequired')),
    role: yup.string().required(t('Error.fieldRequired'))
  });

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain')} ${PASSWORD_REQUIRED_LENGTH} ${t(
          'Error.charactersUppercaseLowercase'
        )}`
      ),
    confirmPassword: yup
      .string()
      .required(t('Error.confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('Error.passwordsDoesNotMatch'))
  });

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_PATTERN, t('Error.invalidEmailFormat'))
      .required(t('Error.emailRequired'))
  });

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_PATTERN, t('Error.invalidEmailFormat'))
      .required(t('Error.emailRequired')),
    password: yup
      .string()
      .required(t('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain')} ${PASSWORD_REQUIRED_LENGTH} ${t(
          'Error.charactersUppercaseLowercase'
        )}`
      )
  });

  return {
    signUpFirstStepSchema,
    signUpSecondStepSchema,
    signInSchema,
    resetPasswordSchema,
    forgotPasswordSchema
  };
}
