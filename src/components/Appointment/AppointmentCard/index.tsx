import { useTranslation } from 'react-i18next';
import { User } from '../../../redux/types/user.type';
import {
  AppointmentCardContainer,
  BottomContainer,
  Counter,
  HeaderContainer,
  FullName,
  DateInfo,
  DateTitle,
  DeleteAppointmentButton
} from './styles';
import { hash } from '../../../constants/other';
import { formatDate } from 'date-fns';
import { ViewLink } from '../../Patient/styles';
import PatientInfo from '../../Patient/PatientInfo';
import { Patient } from '../../../redux/types/patient.type';
import { timeFormat } from '../../../constants/format';
import { useSpecializations } from '../../../constants/mockData';
import { useMemo, useState } from 'react';
import DeleteAppointmentModal from '../../Modal/DeleteAppointmentModal';
import { useDeleteAppointmentMutation } from '../../../redux/services/appointmentApi';
import { toast } from 'react-toastify';

interface IAppointmentCard {
  doctor: User | null;
  patient: Patient;
  start: Date;
  end: Date;
  counter: number;
  isPatient?: boolean;
  appointmentId?: number;
}

const AppointmentCard = ({
  doctor,
  patient,
  start,
  end,
  counter,
  isPatient = false,
  appointmentId
}: IAppointmentCard) => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDeleteAppointment = async (): Promise<void> => {
    await deleteAppointment({ id: appointmentId }).unwrap();
    setIsDeleteModalOpen(false);
    toast.success(t('Appointment.successDeleteAppointment'));
  };

  const getUserSpecialization = useMemo(() => {
    const userSpecialization = specializations.find(
      (spec) => spec.value === doctor?.specialization
    );
    return userSpecialization ? userSpecialization.label : '';
  }, [doctor?.specialization, specializations]);

  const patientFullName = `${patient.firstName} ${patient.lastName}`;

  const doctorInfo = `${doctor?.firstName} ${doctor?.lastName}, ${getUserSpecialization}`;

  const timeInfo = `${formatDate(new Date(start), timeFormat)} - ${formatDate(new Date(end), timeFormat)}`;

  const dateInfo = new Date(start).toLocaleDateString();

  return (
    <AppointmentCardContainer>
      <HeaderContainer>
        <Counter>
          {hash} {counter}
        </Counter>
        {isPatient && (
          <DateInfo>
            <DateTitle>{t('Appointment.date')}</DateTitle> {dateInfo}
          </DateInfo>
        )}
        <DateInfo>
          <DateTitle>{t('Appointment.time')}</DateTitle> {timeInfo}
        </DateInfo>
        {!isPatient ? (
          <>
            <FullName>{patientFullName}</FullName>
            <ViewLink to={`/patient/${patient.id}`}>
              {t('Patient.viewCard')}
            </ViewLink>
          </>
        ) : (
          <>
            <FullName>{doctorInfo}</FullName>
            <DeleteAppointmentButton onClick={() => setIsDeleteModalOpen(true)}>
              {t('Appointment.delete')}
            </DeleteAppointmentButton>
            {isDeleteModalOpen && (
              <DeleteAppointmentModal
                start={start}
                timeInfo={timeInfo}
                doctorInfo={doctorInfo}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                handleDeleteAppointment={handleDeleteAppointment}
              />
            )}
          </>
        )}
      </HeaderContainer>
      {!isPatient ? (
        <BottomContainer>
          <PatientInfo
            isEdit={false}
            isFullName={false}
            patientId={patient.id}
          />
        </BottomContainer>
      ) : (
        <></>
      )}
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;
