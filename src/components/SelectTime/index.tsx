import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { SelectTimeContainer } from './styles';
import { Dayjs } from 'dayjs';

interface ISelectTimeProps {
  onTimeChange: (time: Date | null) => void;
}

const SelectTime = ({ onTimeChange }: ISelectTimeProps) => {
  const handleTimeChange = (time: Dayjs | null) => {
    const dateObject = time ? time.toDate() : null;
    if (onTimeChange) {
      onTimeChange(dateObject);
    }
  };

  return (
    <SelectTimeContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock
            }}
            onChange={handleTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </SelectTimeContainer>
  );
};

export default SelectTime;
