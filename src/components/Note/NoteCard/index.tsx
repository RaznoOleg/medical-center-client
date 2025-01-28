import moment from 'moment';
import {
  AddButton,
  ButtonContainer,
  NoteContainer,
  DateTitle,
  DoctorInfoContainer,
  FileInfoContainer,
  HeaderContainer,
  NoteInfoContainer,
  TextArea,
  TextAreaContainer,
  UploadButton,
  DeleteFile,
  Files
} from '../styles';
import { fullDateFormat, timeFormat } from '../../../constants/format';
import { useTranslation } from 'react-i18next';
import { User } from '../../../redux/types/user.type';
import { ChangeEvent, useMemo, useState } from 'react';
import { useSpecializations } from '../../../constants/mockData';
import { ReactComponent as ClipIcon } from './../../../assets/note/clip.svg';
import { ReactComponent as CrossIcon } from './../../../assets/note/сross.svg';
import { useCreateNoteMutation } from '../../../redux/services/noteApi';
import { toast } from 'react-toastify';
import { Note } from '../../../redux/types/note.type';
import DownloadFile from '../DownloadFile';
import Highlighter from 'react-highlight-words';

interface INoteCard {
  doctor: User | null;
  patientId?: number;
  isCreate?: boolean;
  note?: Note;
  searchValue?: string;
  setIsAddNote?: (isAddNote: boolean) => void;
}

const NoteCard = ({
  doctor,
  isCreate = false,
  patientId,
  note,
  searchValue,
  setIsAddNote = () => {}
}: INoteCard) => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const [createNoteMutation] = useCreateNoteMutation();

  const [noteContent, setNoteContent] = useState('');

  const [files, setFiles] = useState<File[]>([]);

  const today = new Date();

  const getUserSpecialization = useMemo(() => {
    const userSpecialization = specializations.find(
      (spec) => spec.value === doctor?.specialization
    );
    return userSpecialization ? userSpecialization.label : '';
  }, [doctor?.specialization, specializations]);

  const doctorInfo = `${doctor?.firstName} ${doctor?.lastName}, ${getUserSpecialization}`;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleAddNote = async () => {
    try {
      if (!noteContent && !(files.length > 0)) {
        toast.error(t('Error.noNoteContent'));
        return;
      }
      const noteData = {
        content: noteContent,
        userId: doctor?.id,
        patientId: patientId
      };

      await createNoteMutation({ note: noteData, files: files }).unwrap();
      setIsAddNote(false);
      toast.success(t('Note.successCreateNote'));
    } catch (error) {
      toast.error(t('Error.smtWentWrong'));
    }
  };

  return (
    <NoteContainer>
      <HeaderContainer>
        <DateTitle>
          {moment(today).format(fullDateFormat)}
          {!isCreate && (
            <>{`, ${moment(note?.createdAt).format(timeFormat)}`}</>
          )}
        </DateTitle>
      </HeaderContainer>
      <NoteInfoContainer>
        <TextAreaContainer>
          {isCreate ? (
            <>
              <TextArea
                placeholder={t('Note.describeNote')}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
              <ButtonContainer>
                <AddButton onClick={handleAddNote}>{t('Note.add')}</AddButton>
                <input
                  type="file"
                  id="upload"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
                <UploadButton htmlFor="upload">
                  {t('Note.uploadFile')}
                </UploadButton>
              </ButtonContainer>
            </>
          ) : (
            <Highlighter
              searchWords={[searchValue || '']}
              autoEscape={true}
              textToHighlight={note?.content || ''}
            />
          )}
        </TextAreaContainer>
        {files && files.length > 0 && (
          <FileInfoContainer>
            <ClipIcon />
            {Array.from(files).map((file, index) => (
              <Files key={index}>
                <span>{file.name}</span>
                <DeleteFile>
                  <CrossIcon onClick={() => handleDeleteFile(index)} />
                </DeleteFile>
              </Files>
            ))}
          </FileInfoContainer>
        )}
        {note?.files && note?.files.length > 0 && (
          <DownloadFile
            files={note.files}
            style={{ marginTop: note?.content ? '20px' : '0' }}
          />
        )}
      </NoteInfoContainer>
      <DoctorInfoContainer>
        <Highlighter
          searchWords={[searchValue || '']}
          autoEscape={true}
          textToHighlight={doctorInfo}
        />
      </DoctorInfoContainer>
    </NoteContainer>
  );
};

export default NoteCard;
