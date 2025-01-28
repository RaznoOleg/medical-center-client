import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from './../../../assets/patients/call.svg';
import { ReactComponent as EmailIcon } from './../../../assets/patients/email.svg';
import { ReactComponent as PinIcon } from './../../../assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from './../../../assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from './../../../assets/patients/genderFemale.svg';
import { ReactComponent as CalengarIcon } from './../../../assets/patients/calendar.svg';
import {
  BottomContainer,
  ContactInfo,
  ContactsContainer,
  InfoContainer,
  Overview,
  OverviewTitle,
  UserInfo,
  ViewLink
} from '../styles';
import CardWrapper from '../../Wrapper/CardWrapper';
import { Patient } from '../../common/types';
import { female, male } from '../../../constants/patient';
import { ItemContainer } from '../../common/styles';
import { HighlightedText } from '../../HighlightText';
import usePatientInfo from '../../../utils/hooks/usePatientInfo';

interface IPatientItem {
  patient: Patient;
  searchValue: string;
}

function PatientItem({ patient, searchValue }: IPatientItem) {
  const { t } = useTranslation();

  const { phoneNumber, email, gender, id } = patient;

  const { patientFullName, patientAge, patientCityCountry } =
    usePatientInfo(patient);

  return (
    <ItemContainer>
      <CardWrapper title={patientFullName} searchValue={searchValue} id={id}>
        <ContactsContainer>
          <CallIcon />
          <ContactInfo>
            <HighlightedText searchValue={searchValue} text={phoneNumber} />
          </ContactInfo>
          <EmailIcon />
          <ContactInfo>
            <HighlightedText searchValue={searchValue} text={email} />
          </ContactInfo>
        </ContactsContainer>
        <InfoContainer>
          <>
            {gender === male && <GenderMaleIcon />}
            {gender === female && <GenderFemaleIcon />}
            <UserInfo>
              {(gender === male && t('Gender.male')) ||
                (gender === female && t('Gender.female')) ||
                t('Patient.unknownGender')}
            </UserInfo>
            <CalengarIcon />
            <UserInfo>
              <HighlightedText searchValue={searchValue} text={patientAge} />
            </UserInfo>
            <PinIcon />
            <UserInfo>
              <HighlightedText
                searchValue={searchValue}
                text={patientCityCountry}
              />
            </UserInfo>
          </>
        </InfoContainer>
        <BottomContainer>
          {patient?.overview && (
            <Overview>
              <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
              <HighlightedText
                searchValue={searchValue}
                text={patient.overview}
              />
            </Overview>
          )}
          <ViewLink to={`/patient/${id}`}>{t('Patient.viewCard')}</ViewLink>
        </BottomContainer>
      </CardWrapper>
    </ItemContainer>
  );
}

export default PatientItem;
