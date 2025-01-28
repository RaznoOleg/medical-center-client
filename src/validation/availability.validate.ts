import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function AvailabilitySchema() {
  const { t } = useTranslation();

  const bookAppointment = yup.object().shape({
    specialization: yup.string().required(t('Error.fieldRequired')),
    doctor: yup.string().required(t('Error.fieldRequired')),
    date: yup.string().required(t('Error.fieldRequired')),
    time: yup.string().required(t('Error.fieldRequired'))
  });

  return {
    bookAppointment
  };
}
