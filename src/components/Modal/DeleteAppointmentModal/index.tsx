import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Modal from '..';
import { WarningText } from '../styles';

interface IDeleteAppointmentProps {
  setIsDeleteModalOpen: (modal: boolean) => void;
  handleDeleteAppointment: () => void;
  start: Date;
  timeInfo: string;
  doctorInfo: string;
}

const DeleteAppointmentModal = ({
  start,
  timeInfo,
  doctorInfo,
  setIsDeleteModalOpen,
  handleDeleteAppointment
}: IDeleteAppointmentProps) => {
  const { t } = useTranslation();

  const [isClosing, setIsClosing] = useState(false);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
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
      title={t('Appointment.deleteAppointment')}
      onClose={handleModalClose}
      onConfirm={handleDeleteAppointment}
      isClosing={isClosing}
    >
      <>
        <WarningText>{t('Appointment.deleteAppointmentWarning')}</WarningText>
        <p>
          <b>{doctorInfo}</b>
        </p>
        <p>
          <b>{t('Appointment.selectedDate')}</b>
          {new Date(start).toLocaleDateString()}
        </p>
        <p>
          <b>{t('Appointment.selectedTimePeriod')}</b>
          {timeInfo}
        </p>
      </>
    </Modal>
  );
};

export default DeleteAppointmentModal;
