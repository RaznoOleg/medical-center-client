import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Container, GoBack, LinkContainer } from './styles';
import { previous } from '../../constants/other';
import { ArrowBack } from '../common/styles';

function GoBackButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <LinkContainer>
        <GoBack onClick={() => navigate(previous)}>
          <ArrowBack />
          {t('Common.goBack')}
        </GoBack>
      </LinkContainer>
    </Container>
  );
}
export default GoBackButton;
