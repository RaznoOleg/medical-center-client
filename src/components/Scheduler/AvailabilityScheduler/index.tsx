import { useTranslation } from 'react-i18next';
import { CalendarContainer } from '../styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import CreateAvailabilityModal from '../../Modal/CreateAvailabilityModal';
import { toast } from 'react-toastify';
import {
  useCreateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useGetAllAvailabilitiesByUserIdQuery
} from '../../../redux/services/availabilityApi';
import { formatDate } from 'date-fns';
import DeleteAvailabilityModal from '../../Modal/DeleteAvailabilityModal';
import { timeFormat } from '../../../constants/format';
import { PageTitle } from '../../common/styles';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useAppSelector } from '../../../redux/hooks';

export interface IScheduleItem {
  uuid?: string;
  title: string;
  start: Date;
  end: Date;
}

const AvailabilityScheduler = () => {
  const { t } = useTranslation();

  const user = useAppSelector(selectUser);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);

  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [createAvailability] = useCreateAvailabilityMutation();

  const [deleteAvailability] = useDeleteAvailabilityMutation();

  const { data: availabilityData } = useGetAllAvailabilitiesByUserIdQuery({
    userId: user?.id
  });

  const [events, setEvents] = useState<IScheduleItem[]>();

  const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(
    null
  );

  useEffect(() => {
    const mappedEvents =
      availabilityData &&
      availabilityData.map((availability) => ({
        uuid: availability.uuid,
        title: `${formatDate(new Date(availability.startTime), timeFormat)} - ${formatDate(new Date(availability.endTime), timeFormat)}`,
        start: new Date(availability.startTime),
        end: new Date(availability.endTime)
      }));
    setEvents(mappedEvents);
  }, [availabilityData]);

  const { localizer, scrollToTime } = useMemo(() => {
    return {
      localizer: momentLocalizer(moment),
      scrollToTime: moment().toDate()
    };
  }, []);

  const setDateTime = (
    time: Date | null,
    setSelectedTime: (newTime: Date | null) => void
  ) => {
    if (time) {
      const newDateTime = new Date(selectedDate as Date);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());
      setSelectedTime(newDateTime);
    } else {
      setSelectedTime(null);
    }
  };

  const handleStartTimeChange = (time: Date | null) => {
    setDateTime(time, setSelectedStartTime);
  };

  const handleEndTimeChange = (time: Date | null) => {
    setDateTime(time, setSelectedEndTime);
  };

  const handleSelectEvent = (event: IScheduleItem): void => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }): void => {
    if (moment(slotInfo.start).isBefore(moment(), 'day')) {
      toast.error(t('Error.pastDateError'));
      return;
    }
    setSelectedDate(slotInfo.start);
    setShowCreateModal(true);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      if (selectedEndTime <= selectedStartTime) {
        const error = t('Error.endTimeBeforeStartTime');
        setErrorMessage(error);
      } else {
        setErrorMessage('');
      }
    }
  }, [selectedStartTime, selectedEndTime, t]);

  const handleSave = async (): Promise<void> => {
    if (selectedDate) {
      if (!selectedStartTime || !selectedEndTime) {
        const error = t('Error.timeRequired');
        setErrorMessage(error);
        return;
      }

      const availabilityData = {
        startTime: selectedStartTime as Date,
        endTime: selectedEndTime as Date
      };

      if (!errorMessage) {
        try {
          await createAvailability(availabilityData).unwrap();
          setShowCreateModal(false);
          toast.success(t('Availability.successCreateAvailability'));
        } catch (error) {
          setErrorMessage(t('Error.existWorkingHours'));
        }
      }
    }
  };

  const handleDeleteEvent = async (): Promise<void> => {
    try {
      await deleteAvailability({ uuid: selectedEvent?.uuid }).unwrap();
      setSelectedEvent(null);
      toast.success(t('Availability.successDeleteAvailability'));
    } catch (error) {
      setSelectedEvent(null);
      toast.error(t('Availability.errorDeleteAvailability'));
    }
  };

  return (
    <>
      <PageTitle>{t('Availability.myAvailabilitySchedule')}</PageTitle>
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
        />
        {showCreateModal && (
          <CreateAvailabilityModal
            handleSave={handleSave}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
            selectedDate={selectedDate}
            errorMessage={errorMessage}
            setShowCreateModul={setShowCreateModal}
            setErrorMessage={setErrorMessage}
          />
        )}
        {selectedEvent && (
          <DeleteAvailabilityModal
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            handleDeleteEvent={handleDeleteEvent}
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default AvailabilityScheduler;
