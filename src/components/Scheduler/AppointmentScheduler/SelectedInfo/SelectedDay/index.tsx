import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IScheduleItem } from '../..';
import AppointmentCard from '../../../../Appointment/AppointmentCard';
import { SelectedDayInfo, SelectedContainer } from '../styles';
import { User } from '../../../../../redux/types/user.type';
import { fullDateFormat } from '../../../../../constants/format';
import { NoEvents } from '../../../../common/styles';

interface ISelectedDateProps {
  selectedDate: Date | null;
  appointments: IScheduleItem[] | undefined;
  doctor: User | null;
}

function SelectedDay({
  selectedDate,
  appointments,
  doctor
}: ISelectedDateProps) {
  const { t } = useTranslation();

  return (
    <SelectedContainer>
      <SelectedDayInfo>
        {moment(selectedDate).format(fullDateFormat)}
      </SelectedDayInfo>
      {appointments && appointments?.length > 0 ? (
        appointments?.map((appointment, index) => (
          <div key={index}>
            <AppointmentCard
              doctor={doctor}
              counter={index + 1}
              patient={appointment.patient}
              start={appointment.start}
              end={appointment.end}
            />
          </div>
        ))
      ) : (
        <NoEvents>{t('Appointment.noEvents')}</NoEvents>
      )}
    </SelectedContainer>
  );
}

export default SelectedDay;
