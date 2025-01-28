import SignUpFirstStepForm from '../../../components/Auth/SignUpForm/SignUpFirstStepForm';
import SignUpSecondStepForm from '../../../components/Auth/SignUpForm/SignUpSecondStepForm';
import Header from '../../../components/Header';

interface ISignUp {
  isGoogle?: boolean;
}

const SignUp = ({ isGoogle = false }: ISignUp) => {
  return (
    <>
      <Header />
      {isGoogle ? <SignUpSecondStepForm /> : <SignUpFirstStepForm />}
    </>
  );
};

export default SignUp;
