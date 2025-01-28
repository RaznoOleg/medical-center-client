import { toast } from 'react-toastify';
import { NoteFile } from '../../../redux/types/file.type';
import { DownloadFileInfoContainer, FileName, Files } from '../styles';
import { ReactComponent as ClipIcon } from './../../../assets/note/clip.svg';
import { useTranslation } from 'react-i18next';
import { selectAuthToken } from '../../../redux/features/selectors/authSelector';
import { useAppSelector } from '../../../redux/hooks';

interface IDownloadFile {
  files: NoteFile[];
  style?: React.CSSProperties;
}

const DownloadFile = ({ files, style }: IDownloadFile) => {
  const { t } = useTranslation();

  const accessToken = useAppSelector(selectAuthToken);

  const handleDownloadFile = async (file: NoteFile) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}note/file/${file.filename}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(t('Error.smtWentWrong'));
    }
  };

  return (
    <DownloadFileInfoContainer style={style}>
      <ClipIcon />
      {Array.from(files).map((file, index) => (
        <Files key={index}>
          <FileName key={index} onClick={() => handleDownloadFile(file)}>
            {index > 0 && ', '}
            {file.originalName}
          </FileName>
        </Files>
      ))}
    </DownloadFileInfoContainer>
  );
};

export default DownloadFile;
