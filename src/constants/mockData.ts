import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Help } from '../components/common/types';

interface Item {
  value: number | string;
  label: string;
}

export const roles = {
  admin: 'Local',
  doctor: 'Remote'
};

export const useSpecializations = () => {
  const { t } = useTranslation();
  const [specializations, setSpecializations] = useState<Item[]>([]);

  useEffect(() => {
    const fetchedSpecializations = [
      { value: 0, label: t('Specialization.medicalAssistant') },
      { value: 1, label: t('Specialization.anesthesiology') },
      { value: 2, label: t('Specialization.cardiology') },
      { value: 3, label: t('Specialization.allergist') },
      { value: 4, label: t('Specialization.bacteriologist') },
      { value: 5, label: t('Specialization.gastroenterologist') },
      { value: 6, label: t('Specialization.hematologist') },
      { value: 7, label: t('Specialization.dermatologist') },
      { value: 8, label: t('Specialization.nutritionist') },
      { value: 9, label: t('Specialization.endocrinologist') },
      { value: 10, label: t('Specialization.infectionist') },
      { value: 11, label: t('Specialization.beautician') },
      { value: 12, label: t('Specialization.mammologist') },
      { value: 13, label: t('Specialization.narcologist') },
      { value: 14, label: t('Specialization.neuropathologist') },
      { value: 15, label: t('Specialization.oncologist') },
      { value: 16, label: t('Specialization.orthopaedist') },
      { value: 17, label: t('Specialization.otorhinolaryngologist') },
      { value: 18, label: t('Specialization.ophthalmologist') },
      { value: 19, label: t('Specialization.psychiatrist') },
      { value: 20, label: t('Specialization.psychotherapist') },
      { value: 21, label: t('Specialization.pulmonologist') },
      { value: 22, label: t('Specialization.rehabilitator') },
      { value: 23, label: t('Specialization.rheumatologist') },
      { value: 24, label: t('Specialization.dentist') },
      { value: 25, label: t('Specialization.toxicologist') },
      { value: 26, label: t('Specialization.traumatologist') },
      { value: 27, label: t('Specialization.phoniatrician') },
      { value: 28, label: t('Specialization.physiologist') }
    ];

    setSpecializations(fetchedSpecializations);
  }, [t]);

  return specializations;
};

export const useRolesOptions = () => {
  const { t } = useTranslation();
  const [rolesOptions, setRolesOptions] = useState<Item[]>([]);

  useEffect(() => {
    const fetchedRolesOptions = [
      { value: 'Local', label: t('Role.admin') },
      { value: 'Remote', label: t('Role.doctor') }
    ];

    setRolesOptions(fetchedRolesOptions);
  }, [t]);

  return rolesOptions;
};

export const useGenders = () => {
  const { t } = useTranslation();
  const [genders, setGenders] = useState<Item[]>([]);

  useEffect(() => {
    const fetchedGenders = [
      { value: 'Male', label: t('Gender.male') },
      { value: 'Female', label: t('Gender.female') }
    ];

    setGenders(fetchedGenders);
  }, [t]);

  return genders;
};

export const useCountries = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Item[]>([]);

  useEffect(() => {
    const fetchedCountries = [
      { id: 0, value: 'AL', label: t('Country.albania') },
      { id: 1, value: 'AD', label: t('Country.andorra') },
      { id: 2, value: 'AT', label: t('Country.austria') },
      { id: 3, value: 'BE', label: t('Country.belgium') },
      { id: 4, value: 'BA', label: t('Country.bosniaHerzegovina') },
      { id: 5, value: 'BG', label: t('Country.bulgaria') },
      { id: 6, value: 'HR', label: t('Country.croatia') },
      { id: 7, value: 'CY', label: t('Country.cyprus') },
      { id: 8, value: 'CZ', label: t('Country.czechRepublic') },
      { id: 9, value: 'DK', label: t('Country.denmark') },
      { id: 10, value: 'EE', label: t('Country.estonia') },
      { id: 11, value: 'FI', label: t('Country.finland') },
      { id: 12, value: 'FR', label: t('Country.france') },
      { id: 13, value: 'DE', label: t('Country.germany') },
      { id: 14, value: 'GR', label: t('Country.greece') },
      { id: 15, value: 'HU', label: t('Country.hungary') },
      { id: 16, value: 'IS', label: t('Country.iceland') },
      { id: 17, value: 'IE', label: t('Country.ireland') },
      { id: 18, value: 'IT', label: t('Country.italy') },
      { id: 19, value: 'XK', label: t('Country.kosovo') },
      { id: 20, value: 'LV', label: t('Country.latvia') },
      { id: 21, value: 'LI', label: t('Country.liechtenstein') },
      { id: 22, value: 'LT', label: t('Country.lithuania') },
      { id: 23, value: 'LU', label: t('Country.luxembourg') },
      { id: 24, value: 'MT', label: t('Country.malta') },
      { id: 25, value: 'MC', label: t('Country.monaco') },
      { id: 26, value: 'ME', label: t('Country.montenegro') },
      { id: 27, value: 'NL', label: t('Country.netherlands') },
      { id: 28, value: 'MK', label: t('Country.northMacedonia') },
      { id: 29, value: 'NO', label: t('Country.norway') },
      { id: 30, value: 'PL', label: t('Country.poland') },
      { id: 31, value: 'PT', label: t('Country.portugal') },
      { id: 32, value: 'RO', label: t('Country.romania') },
      { id: 33, value: 'SM', label: t('Country.sanMarino') },
      { id: 34, value: 'RS', label: t('Country.serbia') },
      { id: 35, value: 'SK', label: t('Country.slovakia') },
      { id: 36, value: 'SI', label: t('Country.slovenia') },
      { id: 37, value: 'ES', label: t('Country.spain') },
      { id: 38, value: 'SE', label: t('Country.sweden') },
      { id: 39, value: 'CH', label: t('Country.switzerland') },
      { id: 40, value: 'TR', label: t('Country.turkey') },
      { id: 41, value: 'UA', label: t('Country.ukraine') },
      { id: 42, value: 'GB', label: t('Country.unitedKingdom') },
      { id: 43, value: 'VA', label: t('Country.vaticanCity') }
    ];

    setCountries(fetchedCountries);
  }, [t]);

  return countries;
};

export const useHelpers = () => {
  const { t } = useTranslation();
  const [helpers, setHelpers] = useState<Help[]>([]);

  useEffect(() => {
    const fetchedHelpers = [
      { question: t('Question.1'), answer: t('Answer.1') },
      { question: t('Question.2'), answer: t('Answer.2') },
      { question: t('Question.3'), answer: t('Answer.3') },
      { question: t('Question.4'), answer: t('Answer.4') },
      { question: t('Question.5'), answer: t('Answer.5') }
    ];

    setHelpers(fetchedHelpers);
  }, [t]);

  return helpers;
};
