import {
  BookAppointmentButton,
  ButtonContainer,
  ContactInfo,
  ContactsContainer,
  EditCardLink,
  HeaderContainer,
  InfoContainer,
  MainContainer,
  Overview,
  OverviewTitle,
  PatientCardContainer,
  PatientInfoName,
  UserInfo
} from '../styles';
import { male, female } from '../../../constants/patient';
import { ReactComponent as CallIcon } from './../../../assets/patients/call.svg';
import { ReactComponent as EmailIcon } from './../../../assets/patients/email.svg';
import { ReactComponent as PinIcon } from './../../../assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from './../../../assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from './../../../assets/patients/genderFemale.svg';
import { ReactComponent as CalengarIcon } from './../../../assets/patients/calendar.svg';
import { useGetPatientByIdQuery } from '../../../redux/services/patientApi';
import Loader from '../../Loader';
import { useTranslation } from 'react-i18next';
import usePatientInfo from '../../../utils/hooks/usePatientInfo';

interface IPatientInfoProps {
  isEdit?: boolean;
  isFullName?: boolean;
  patientId?: number;
}

const PatientInfo = ({
  isEdit = true,
  patientId,
  isFullName = true
}: IPatientInfoProps) => {
  const { t } = useTranslation();

  const { data: patient, isLoading } = useGetPatientByIdQuery({
    id: patientId
  });

  const { patientFullName, patientAge, patientCityCountry } =
    usePatientInfo(patient);

  if (isLoading) {
    return <Loader />;
  }

  // const patientAge: string = patient?.birthDate
  //   ? `${new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()} ${t('Patient.years')}`
  //   : t('Patient.unknownAge');

  // console.log(patient?.birthDate);
  // console.log(
  //   patient?.birthDate && `${new Date(patient?.birthDate).getFullYear()}`
  // );
  // console.log(patientAge);

  // const patientFullName = `${patient?.firstName} ${patient?.lastName}`;

  // const patientCity: string = patient?.city
  //   ? patient?.city
  //   : t('Patient.unknownCity');

  // const patientCountry: string = patient?.country
  //   ? patient?.country
  //   : t('Patient.unknownCountry');

  return (
    <PatientCardContainer>
      <HeaderContainer>
        {isFullName && <PatientInfoName>{patientFullName}</PatientInfoName>}
        {isEdit && (
          <EditCardLink to={`/edit-patient/${patientId}`}>
            {t('Patients.editCard')}
          </EditCardLink>
        )}
      </HeaderContainer>
      <MainContainer>
        <div>
          <ContactsContainer>
            <CallIcon />
            <ContactInfo>{patient?.phoneNumber}</ContactInfo>
            <EmailIcon />
            <ContactInfo>{patient?.email}</ContactInfo>
          </ContactsContainer>
          <InfoContainer>
            <>
              {patient?.gender === male && <GenderMaleIcon />}
              {patient?.gender === female && <GenderFemaleIcon />}
              <UserInfo>
                {(patient?.gender === male && t('Gender.male')) ||
                  (patient?.gender === female && t('Gender.female')) ||
                  t('Patient.unknownGender')}
              </UserInfo>
              <CalengarIcon />
              <UserInfo>{patientAge}</UserInfo>
              <PinIcon />
              <UserInfo>{patientCityCountry}</UserInfo>
            </>
          </InfoContainer>
        </div>
        {isEdit && (
          <ButtonContainer>
            <BookAppointmentButton to={`/book-appointment/${patient?.id}`}>
              {t('Appointment.bookAppointment')}
            </BookAppointmentButton>
          </ButtonContainer>
        )}
      </MainContainer>
      {patient?.overview && (
        <Overview>
          <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
          {patient.overview}
        </Overview>
      )}
    </PatientCardContainer>
  );
};

export default PatientInfo;
