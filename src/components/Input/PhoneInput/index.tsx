import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import 'react-phone-input-2/lib/bootstrap.css';
import { FormValues } from '../../common/types';
import { FieldName } from '../types';
import { HelperText, PhoneContainer, PhoneInputContainer } from './styles';
import { StyleSheetManager } from 'styled-components';

function PhoneInput({
  control,
  name,
  label,
  error,
  type,
  helperText,
  ...props
}: TextFieldProps & { control: Control<FormValues> }) {
  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <Controller
        control={control}
        defaultValue=""
        name={name as FieldName}
        render={(rest) => (
          <PhoneContainer>
            <PhoneInputContainer
              {...props}
              error={error ? true : false}
              value={String(rest.field.value)}
              onChange={rest.field.onChange}
              country={'ua'}
              countryCodeEditable={false}
              containerClass={'container-phone'}
              inputClass={'input-phone'}
              buttonClass={'button-class'}
            />
            <HelperText>{helperText}</HelperText>
          </PhoneContainer>
        )}
      />
    </StyleSheetManager>
  );
}

export default PhoneInput;
