import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Modal from '..';
import { WarningText } from '../styles';

export interface IScheduleItem {
  uuid?: string;
  title: string;
  start: Date;
  end: Date;
}

interface IDeleteAvailabilityProps {
  selectedEvent: IScheduleItem | null;
  setSelectedEvent: (event: IScheduleItem | null) => void;
  handleDeleteEvent: () => void;
}

const DeleteAvailabilityModal = ({
  selectedEvent,
  setSelectedEvent,
  handleDeleteEvent
}: IDeleteAvailabilityProps) => {
  const { t } = useTranslation();

  const [isClosing, setIsClosing] = useState(false);

  const handleModalClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedEvent(null);
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    if (isClosing) {
      return () => clearTimeout(0);
    }
  }, [isClosing]);

  return (
    <Modal
      title={t('Availability.deleteWorkingHours')}
      onClose={handleModalClose}
      onConfirm={handleDeleteEvent}
      isClosing={isClosing}
    >
      <>
        <WarningText>{t('Availability.deleteWorkingHoursWarning')}</WarningText>
        {selectedEvent && (
          <p>
            <b>{t('Availability.selectedDate')}</b>
            {selectedEvent.start.toLocaleDateString()}
          </p>
        )}
        {selectedEvent && (
          <p>
            <b>{t('Availability.selectedTimePeriod')}</b>
            {selectedEvent.title}
          </p>
        )}
      </>
    </Modal>
  );
};

export default DeleteAvailabilityModal;
