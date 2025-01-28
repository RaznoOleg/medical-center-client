import { useTranslation } from 'react-i18next';
import SelectTime from '../../SelectTime';
import { useState } from 'react';
import Modal from '..';
import { ErrorText, SelectTimeContainer, SelectTimeTitle } from '../styles';

interface ICreateAvailabilityProps {
  selectedDate: Date | null;
  errorMessage: string;
  handleStartTimeChange: (time: Date | null) => void;
  handleEndTimeChange: (time: Date | null) => void;
  handleSave: () => void;
  setShowCreateModul: (show: boolean) => void;
  setErrorMessage: (message: string) => void;
}

const CreateAvailabilityModal = ({
  selectedDate,
  errorMessage,
  handleStartTimeChange,
  handleEndTimeChange,
  handleSave,
  setShowCreateModul,
  setErrorMessage
}: ICreateAvailabilityProps) => {
  const { t } = useTranslation();

  const [isClosing, setIsClosing] = useState(false);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCreateModul(false);
      setErrorMessage('');
      setIsClosing(false);
    }, 500);
  };

  return (
    <Modal
      title={t('Availability.selectTime')}
      onClose={handleModalClose}
      onConfirm={handleSave}
      isClosing={isClosing}
    >
      <>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {selectedDate && (
          <p>
            <b>{t('Availability.selectedDate')}</b>
            {selectedDate.toLocaleDateString()}
          </p>
        )}
        <SelectTimeContainer>
          <SelectTimeTitle>{t('Availability.startTime')}</SelectTimeTitle>
          <SelectTime onTimeChange={handleStartTimeChange} />
        </SelectTimeContainer>
        <SelectTimeContainer>
          <SelectTimeTitle>{t('Availability.endTime')}</SelectTimeTitle>
          <SelectTime onTimeChange={handleEndTimeChange} />
        </SelectTimeContainer>
      </>
    </Modal>
  );
};

export default CreateAvailabilityModal;
