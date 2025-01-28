import { useTranslation } from 'react-i18next';
import { LoaderWrapper, NoEvents, PageTitle } from '../../common/styles';
import { useGetAllTodayAppointmentsByUserIdQuery } from '../../../redux/services/appointmentApi';
import Loader from '../../Loader';
import AppointmentCard from '../AppointmentCard';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useAppSelector } from '../../../redux/hooks';

const AppointmentsToday = () => {
  const { t } = useTranslation();

  const user = useAppSelector(selectUser);

  const { data: appointmentData, isLoading } =
    useGetAllTodayAppointmentsByUserIdQuery({
      userId: user?.id
    });

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <PageTitle>{t('Appointment.todayAppointment')}</PageTitle>
      {appointmentData && appointmentData.length > 0 ? (
        appointmentData.map((appointment, index) => (
          <div key={index}>
            <AppointmentCard
              doctor={user}
              counter={index + 1}
              patient={appointment.patient}
              start={appointment.startTime}
              end={appointment.endTime}
            />
          </div>
        ))
      ) : (
        <NoEvents>{t('Appointment.noTodayEvents')}</NoEvents>
      )}
    </>
  );
};

export default AppointmentsToday;
