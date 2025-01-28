import moment from 'moment';
import { IScheduleItem } from '../..';
import { fullDateFormat } from '../../../../../constants/format';
import { User } from '../../../../../redux/types/user.type';
import { SelectedContainer, SelectedDayInfo } from '../styles';
import AppointmentCard from '../../../../Appointment/AppointmentCard';

interface ISelectedEventProps {
  selectedEvent: IScheduleItem;
  doctor: User | null;
}

const SelectedEvent = ({ selectedEvent, doctor }: ISelectedEventProps) => {
  return (
    <SelectedContainer>
      <SelectedDayInfo>
        {moment(selectedEvent.start).format(fullDateFormat)}
      </SelectedDayInfo>
      <AppointmentCard
        counter={1}
        doctor={doctor}
        patient={selectedEvent.patient}
        start={selectedEvent.start}
        end={selectedEvent.end}
      />
    </SelectedContainer>
  );
};

export default SelectedEvent;
