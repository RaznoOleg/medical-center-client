import { useParams } from 'react-router-dom';
import GoBackButton from '../../components/GoBackButton';
import PatientInfo from '../../components/Patient/PatientInfo';
import Wrapper from '../../components/Wrapper';
import PatientAppointments from '../../components/Patient/PatientAppointments';
import PatientNotes from '../../components/Patient/PatientNotes';

const PatientCard = () => {
  const { id } = useParams();

  return (
    <>
      <GoBackButton />
      <Wrapper>
        <PatientInfo patientId={Number(id)} />
        <PatientAppointments patientId={Number(id)} />
        <PatientNotes patientId={Number(id)} />
      </Wrapper>
    </>
  );
};

export default PatientCard;
