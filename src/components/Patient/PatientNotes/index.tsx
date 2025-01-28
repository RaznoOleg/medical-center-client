import { useTranslation } from 'react-i18next';
import {
  CreateNoteContainer,
  SearchBar,
  SearchContainer,
  Title
} from '../styles';
import AddNoteButton from '../../Note/AddNoteButton';
import { useState } from 'react';
import NoteCard from '../../Note/NoteCard';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useAppSelector } from '../../../redux/hooks';
import { LoadMoreButton, NoEvents } from '../../common/styles';
import { useGetAllNotesByPatientIdQuery } from '../../../redux/services/noteApi';
import { Note } from '../../../redux/types/note.type';
import { useSpecializations } from '../../../constants/mockData';
import usePagination from '../../../utils/hooks/usePagination';

interface IPatientNotesProps {
  patientId: number;
}

const PatientNotes = ({ patientId }: IPatientNotesProps) => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const user = useAppSelector(selectUser);

  const { startIndex, endIndex, handleLoadMoreClick } = usePagination();

  const { data: patientNoteData } = useGetAllNotesByPatientIdQuery({
    patientId: patientId
  });

  const [isAddNote, setIsAddNote] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleIsAddNote = () => {
    setIsAddNote(!isAddNote);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getFilteredNotes = (search: string, notes?: Note[]): Note[] => {
    if (search.trim() !== '') {
      return (notes || []).filter(
        ({ content, user }) =>
          content.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          specializations[user.specialization].label
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    return notes || [];
  };

  const filteredNotes = getFilteredNotes(searchValue, patientNoteData) || [];

  return (
    <>
      <Title>{t('Patient.medicalHistory')}</Title>
      <AddNoteButton handleIsAddNote={handleIsAddNote} isAddNote={isAddNote} />
      {isAddNote && (
        <CreateNoteContainer>
          <NoteCard
            doctor={user}
            isCreate={true}
            patientId={patientId}
            setIsAddNote={setIsAddNote}
          />
        </CreateNoteContainer>
      )}
      <SearchContainer>
        <SearchBar
          type="text"
          placeholder={t('Common.search')}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      {filteredNotes.length > 0 ? (
        filteredNotes.slice(startIndex, endIndex).map((note, index) => (
          <div key={index}>
            <NoteCard
              doctor={note.user}
              note={note}
              searchValue={searchValue}
            />
          </div>
        ))
      ) : (
        <NoEvents>
          {searchValue !== '' ? t('Note.noFound') : t('Note.noNote')}
        </NoEvents>
      )}
      {filteredNotes.length > endIndex && (
        <LoadMoreButton onClick={handleLoadMoreClick}>
          {t('Common.loadMore')}
        </LoadMoreButton>
      )}
    </>
  );
};

export default PatientNotes;
