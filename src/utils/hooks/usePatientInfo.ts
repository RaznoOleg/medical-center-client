import { useTranslation } from 'react-i18next';
import { reformatDate } from './../functions/reformatDate';

interface IPatientInfo {
  firstName: string;
  lastName: string;
  birthDate?: string | null;
  city?: string | null;
  country?: string | null;
}

const usePatientInfo = (patient?: IPatientInfo) => {
  const { t } = useTranslation();

  const patientAge: string = patient?.birthDate
    ? `${new Date().getFullYear() - new Date(reformatDate(patient?.birthDate)).getFullYear()} ${t('Patient.years')}`
    : t('Patient.unknownAge');

  const patientFullName = `${patient?.firstName} ${patient?.lastName}`;

  const patientCity: string = patient?.city
    ? patient.city
    : t('Patient.unknownCity');

  const patientCountry: string = patient?.country
    ? patient.country
    : t('Patient.unknownCountry');

  const patientCityCountry = `${patientCountry}, ${patientCity}`;

  return {
    patientAge,
    patientFullName,
    patientCityCountry
  };
};

export default usePatientInfo;
