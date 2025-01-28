import EditPatientForm from '../../../components/Form/PatientForm/EditPatientForm';
import GoBackButton from '../../../components/GoBackButton';
import FormWrapper from '../../../components/Wrapper/FormWrapper';

const EditPatient = () => {
  return (
    <>
      <GoBackButton />
      <FormWrapper>
        <EditPatientForm />
      </FormWrapper>
    </>
  );
};

export default EditPatient;
