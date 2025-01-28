import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField } from '@mui/material';
import InputContainer from './styles';
import { FieldName } from './types';
import { BLACK } from '../../constants/colors';
import { FormValues } from '../common/types';
import { StyleSheetManager } from 'styled-components';

export function Input({
  control,
  name,
  label,
  error,
  type,
  placeholder,
  ...props
}: TextFieldProps & { control: Control<FormValues> }) {
  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <InputContainer error={error?.valueOf().toString()}>
        <span>{label}</span>
        <Controller
          control={control}
          defaultValue=""
          name={name as FieldName}
          render={(rest) => (
            <>
              <TextField
                {...props}
                id={name}
                type={type}
                placeholder={placeholder}
                value={rest.field.value}
                sx={{ input: { color: type === 'date' ? `${BLACK}` : null } }}
                onChange={rest.field.onChange}
                autoComplete="new-password"
              />
            </>
          )}
        />
      </InputContainer>
    </StyleSheetManager>
  );
}

export default Input;
