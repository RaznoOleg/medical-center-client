import GoBackButton from '../../../components/GoBackButton';
import FormWrapper from '../../../components/Wrapper/FormWrapper';
import CreatePatientForm from './../../../components/Form/PatientForm/CreatePatientForm/index';

const CreatePatient = () => {
  return (
    <>
      <GoBackButton />
      <FormWrapper>
        <CreatePatientForm />
      </FormWrapper>
    </>
  );
};

export default CreatePatient;
