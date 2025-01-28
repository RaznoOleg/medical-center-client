import { useTranslation } from 'react-i18next';
import { Title } from '../styles';
import { useGetAllAppointmentsByPatientIdQuery } from '../../../redux/services/appointmentApi';
import AppointmentCard from '../../Appointment/AppointmentCard';
import { NoEvents } from '../../common/styles';

interface IPatientAppointmentsProps {
  patientId: number;
}

const PatientAppointments = ({ patientId }: IPatientAppointmentsProps) => {
  const { t } = useTranslation();

  const { data: patientAppointmentData } =
    useGetAllAppointmentsByPatientIdQuery({ patientId: patientId });

  return (
    <>
      <Title>{t('Patient.appointments')}</Title>
      {patientAppointmentData && patientAppointmentData.length > 0 ? (
        patientAppointmentData.map((appointment, index) => (
          <div key={index}>
            <AppointmentCard
              appointmentId={appointment.id}
              doctor={appointment.user}
              counter={index + 1}
              patient={appointment.patient}
              start={appointment.startTime}
              end={appointment.endTime}
              isPatient={true}
            />
          </div>
        ))
      ) : (
        <NoEvents>{t('Patient.noAppointments')}</NoEvents>
      )}
    </>
  );
};

export default PatientAppointments;
