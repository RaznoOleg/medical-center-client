import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SelectDateContainer } from './styles';
import { DatePicker } from '@mui/x-date-pickers';
import { dateFormat } from './../../constants/format';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '../common/types';
import dayjs, { Dayjs } from 'dayjs';
import { StyleSheetManager } from 'styled-components';

interface SelectDateProps {
  control: Control<FormValues>;
  name: string;
  helperText?: string;
  error: boolean;
  required?: boolean;
}

const SelectDate = ({
  control,
  name,
  helperText,
  error,
  required
}: SelectDateProps) => {
  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <SelectDateContainer error={error.valueOf().toString()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <Controller
              name={name}
              control={control}
              rules={{ required: required }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  format={dateFormat}
                  value={dayjs(value, dateFormat)}
                  onChange={(date: Dayjs | null) => {
                    onChange(
                      date && date.isValid() ? date.format(dateFormat) : ''
                    );
                  }}
                  slotProps={{
                    textField: {
                      helperText: helperText,
                      error: error || !value,
                      fullWidth: true
                    }
                  }}
                />
              )}
            />
          </DemoContainer>
        </LocalizationProvider>
      </SelectDateContainer>
    </StyleSheetManager>
  );
};

export default SelectDate;
