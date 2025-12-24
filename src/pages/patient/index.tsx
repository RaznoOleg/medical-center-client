import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GoBackButton from '../../components/GoBackButton';
import PatientInfo from '../../components/Patient/PatientInfo';
import Wrapper from '../../components/Wrapper';
import PatientAppointments from '../../components/Patient/PatientAppointments';
import PatientNotes from '../../components/Patient/PatientNotes';
import PatientVitals from '../../components/Patient/PatientVitals';
import PatientPrediction from '../../components/Patient/PatientPrediction';
import Tabs from '../../components/Tabs';

const PatientCard = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const tabs = [
    {
      label: t('Patient.medicalHistory'),
      content: <PatientNotes patientId={Number(id)} />
    },
    {
      label: t('Patient.vitals'),
      content: <PatientVitals patientId={Number(id)} />
    },
    {
      label: t('Patient.predictions'),
      content: <PatientPrediction patientId={Number(id)} />
    }
  ];

  return (
    <>
      <GoBackButton />
      <Wrapper>
        <PatientInfo patientId={Number(id)} />
        <PatientAppointments patientId={Number(id)} />
        <Tabs tabs={tabs} />
      </Wrapper>
    </>
  );
};

export default PatientCard;
