import { Route, Routes } from 'react-router-dom';
import { PATH } from '../constants/routes';
import SignIn from '../pages/auth/signIn';
import SignUp from '../pages/auth/signUp';
import ForgotPassword from '../pages/auth/forgotPassword';
import ResetPassword from '../pages/auth/resetPassword';
import Confirmation from '../pages/auth/confirmation';
import PrivateRoute from '../components/PrivateRoute';
import Verification from '../pages/auth/verification';
import GoogleRedirect from '../components/Auth/GoogleRedirect';
import Profile from '../pages/profile';
import Patients from '../pages/patients';
import CreatePatient from '../pages/patient/createPatient';
import EditPatient from '../pages/patient/editPatient';
import PatientCard from '../pages/patient';
import BookAppointment from '../pages/bookAppointment';
import AvailabilitySchedule from '../pages/schedule/availabilitySchedule';
import AppointmentSchedule from '../pages/schedule/appointmentSchedule';
import Dashboard from '../pages/dashboard';
import Help from '../pages/help';

function AppRouter() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<SignIn />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
      <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
      <Route path={PATH.CONFIRM} element={<Confirmation />} />
      <Route path={PATH.VERIFICATION} element={<Verification />} />
      <Route path={PATH.GOOGLE_REDIRECT} element={<GoogleRedirect />} />
      <Route
        path={PATH.SIGN_UP_WITH_GOOGLE}
        element={<SignUp isGoogle={true} />}
      />
      <Route
        path={PATH.DASHBOARD}
        element={<PrivateRoute component={<Dashboard />} />}
      />
      <Route
        path={PATH.APPOINTMENTS}
        element={<PrivateRoute component={<AppointmentSchedule />} />}
      />
      <Route
        path={PATH.AVAILABILITY}
        element={<PrivateRoute component={<AvailabilitySchedule />} />}
      />
      <Route
        path={PATH.PATIENTS}
        element={<PrivateRoute component={<Patients />} />}
      />
      <Route
        path={PATH.PROFILE}
        element={<PrivateRoute component={<Profile />} />}
      />
      <Route path={PATH.HELP} element={<PrivateRoute component={<Help />} />} />
      <Route
        path={PATH.CREATE_PATIENT}
        element={<PrivateRoute component={<CreatePatient />} />}
      />
      <Route
        path={PATH.EDIT_PATIENT}
        element={<PrivateRoute component={<EditPatient />} />}
      />
      <Route
        path={PATH.PATIENT_CARD}
        element={<PrivateRoute component={<PatientCard />} />}
      />
      <Route
        path={PATH.BOOK_APPOINTMENT}
        element={<PrivateRoute component={<BookAppointment />} />}
      />
    </Routes>
  );
}

export default AppRouter;
