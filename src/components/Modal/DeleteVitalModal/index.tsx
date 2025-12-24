import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Modal from '..';
import { WarningText } from '../styles';
import { PatientVital } from '../../../redux/types/vitals.type';

interface IDeleteVitalModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  vital: PatientVital | null;
  handleDeleteVital: () => void;
}

const DeleteVitalModal = ({
  isOpen,
  setIsOpen,
  vital,
  handleDeleteVital
}: IDeleteVitalModalProps) => {
  const { t } = useTranslation();

  const [isClosing, setIsClosing] = useState(false);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    if (isClosing) {
      return () => clearTimeout(0);
    }
  }, [isClosing]);

  if (!isOpen || !vital) {
    return null;
  }

  const formattedDate = dayjs(vital.measurementTime).format('DD.MM.YY');

  return (
    <Modal
      title={t('Patient.deleteVital')}
      onClose={handleModalClose}
      onConfirm={handleDeleteVital}
      isClosing={isClosing}
    >
      <>
        <WarningText>{t('Patient.deleteVitalWarning')}</WarningText>
        <p>
          <b>{t('Patient.date')}:</b> {formattedDate}
        </p>
        <p>
          <b>{t('Patient.systolic')}:</b> {vital.systolic}
        </p>
        <p>
          <b>{t('Patient.diastolic')}:</b> {vital.diastolic}
        </p>
        <p>
          <b>{t('Patient.glucose')}:</b> {vital.glucose}
        </p>
        <p>
          <b>{t('Patient.pulse')}:</b> {vital.pulse}
        </p>
      </>
    </Modal>
  );
};

export default DeleteVitalModal;
