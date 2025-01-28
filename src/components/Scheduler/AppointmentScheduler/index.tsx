import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarContainer } from '../styles';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Patient } from '../../../redux/types/patient.type';
import { User } from '../../../redux/types/user.type';
import { useTranslation } from 'react-i18next';
import { useGetAllAppointmentsByUserIdQuery } from '../../../redux/services/appointmentApi';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useAppSelector } from '../../../redux/hooks';
import { formatDate } from 'date-fns';
import SelectedDay from './SelectedInfo/SelectedDay';
import { timeFormat } from '../../../constants/format';
import SelectedEvent from './SelectedInfo/SelectedEvent';
import { PageTitle } from '../../common/styles';

export interface IScheduleItem {
  title: string;
  start: Date;
  end: Date;
  patient: Patient;
  doctor: User;
}

const AppointmentScheduler = () => {
  const { t } = useTranslation();

  const user = useAppSelector(selectUser);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(
    null
  );

  const [events, setEvents] = useState<IScheduleItem[]>();

  const [appointmentsForSelectedSlot, setAppointmentsForSelectedSlot] =
    useState<IScheduleItem[]>();

  const { data: appointmentData } = useGetAllAppointmentsByUserIdQuery({
    userId: user?.id
  });

  useEffect(() => {
    const mappedEvents =
      appointmentData &&
      appointmentData.map((appointment) => ({
        title: `${formatDate(new Date(appointment.startTime), timeFormat)} - ${formatDate(new Date(appointment.endTime), timeFormat)}`,
        patient: appointment.patient,
        doctor: appointment.user,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime)
      }));
    setEvents(mappedEvents);
  }, [appointmentData]);

  const { localizer, scrollToTime } = useMemo(() => {
    return {
      localizer: momentLocalizer(moment),
      scrollToTime: moment().toDate()
    };
  }, []);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }): void => {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    const selectedDayEvents = events?.filter((event) => {
      const eventDate = moment(event.start).startOf('day');
      return eventDate.isSame(moment(slotInfo.start).startOf('day'));
    });

    setAppointmentsForSelectedSlot(selectedDayEvents);
  };

  const handleSelectEvent = (event: IScheduleItem): void => {
    setSelectedDate(null);
    setSelectedEvent(event);
  };

  const AgendaEvent = ({ event }: { event: IScheduleItem }) => {
    const patientFullName = `${event?.patient.firstName} ${event?.patient.lastName}`;

    const patient = `${patientFullName}`;

    return (
      <div>
        {t('Appointment.appointmentWith')} {patient}
      </div>
    );
  };

  return (
    <>
      <PageTitle>{t('Appointment.myAppointmentSchedule')}</PageTitle>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          scrollToTime={scrollToTime}
          events={events}
          components={{
            agenda: {
              event: AgendaEvent
            }
          }}
        />
        {selectedDate && (
          <SelectedDay
            selectedDate={selectedDate}
            appointments={appointmentsForSelectedSlot}
            doctor={user}
          />
        )}
        {selectedEvent && (
          <SelectedEvent selectedEvent={selectedEvent} doctor={user} />
        )}
      </CalendarContainer>
    </>
  );
};

export default AppointmentScheduler;
