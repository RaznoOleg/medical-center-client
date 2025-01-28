import { useTranslation } from 'react-i18next';
import { Patient } from '../../common/types';
import PatientItem from '../PatientItem';
import { useGetAllPatientsQuery } from '../../../redux/services/patientApi';
import ItemList from '../../ItemList';

const PatientList = () => {
  const { t } = useTranslation();

  const { data: allPatients, isLoading } = useGetAllPatientsQuery();

  return (
    <ItemList<Patient>
      data={allPatients || []}
      isButton={true}
      renderItem={(patient, index, searchValue) => (
        <PatientItem key={index} patient={patient} searchValue={searchValue} />
      )}
      placeholder={t('Patients.search')}
      notFoundMessage={
        isLoading ? t('Patients.notFound') : t('Patient.notFound')
      }
    />
  );
};

export default PatientList;
