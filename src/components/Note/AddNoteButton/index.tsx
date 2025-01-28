import { ReactComponent as PlusIcon } from './../../../assets/note/plus.svg';
import { ReactComponent as CancelIcon } from './../../../assets/note/cancel.svg';
import { useTranslation } from 'react-i18next';
import { IconContainer, AddNoteContainer, Text } from './styles';

interface IAddNoteButtonProps {
  isAddNote: boolean;
  handleIsAddNote: () => void;
}

const AddNoteButton = ({ handleIsAddNote, isAddNote }: IAddNoteButtonProps) => {
  const { t } = useTranslation();
  return (
    <AddNoteContainer onClick={handleIsAddNote}>
      {!isAddNote ? (
        <>
          <IconContainer>
            <PlusIcon />
          </IconContainer>
          <Text>{t('Note.addAppointmentNote')}</Text>
        </>
      ) : (
        <>
          <IconContainer>
            <CancelIcon />
          </IconContainer>
          <Text>{t('Note.discardAdding')}</Text>
        </>
      )}
    </AddNoteContainer>
  );
};

export default AddNoteButton;
