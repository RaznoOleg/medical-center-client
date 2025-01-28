import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField, Autocomplete } from '@mui/material';
import InputContainer from '../styles';
import { FieldName, Option } from '../types';
import { FormValues } from '../../common/types';
import { StyleSheetManager } from 'styled-components';

export type Props = {
  options: Option[];
} & TextFieldProps;

export function SelectInput({
  control,
  name,
  label,
  error,
  placeholder,
  options = [],
  ...props
}: Props & { control: Control<FormValues> }) {
  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <InputContainer error={error?.valueOf().toString()}>
        <span>{label}</span>
        <Controller
          control={control}
          name={name as FieldName}
          render={({ field: { ref, onChange, value, ...field } }) => (
            <Autocomplete
              options={options}
              onChange={(event, data) => {
                const selectedValue = data ? data.value : null;
                onChange(selectedValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...props}
                  {...params}
                  {...field}
                  fullWidth
                  inputRef={ref}
                  placeholder={placeholder}
                />
              )}
              value={options?.find((option) => option.value === value) || null}
            />
          )}
        />
      </InputContainer>
    </StyleSheetManager>
  );
}

export default SelectInput;
