import BookAppointmentForm from '../../components/Form/BookAppointmentForm';
import GoBackButton from '../../components/GoBackButton';
import FormWrapper from '../../components/Wrapper/FormWrapper';

const BookAppointment = () => {
  return (
    <>
      <GoBackButton />
      <FormWrapper>
        <BookAppointmentForm />
      </FormWrapper>
    </>
  );
};

export default BookAppointment;
