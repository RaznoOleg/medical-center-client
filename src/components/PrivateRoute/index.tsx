import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import { selectAuthToken } from '../../redux/features/selectors/authSelector';
import PageWrapper from '../Wrapper/PageWrapper';
import { useGetUserQuery } from '../../redux/services/userApi';
import { setUser } from '../../redux/features/slices/userSlice';

interface IProps {
  component: ReactElement;
}

export const PrivateRoute = ({ component }: IProps) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuthToken);

  const { data: user, isSuccess } = useGetUserQuery(null, {
    skip: !accessToken
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ user }));
    }
  }, [accessToken, dispatch, isSuccess, user]);

  return accessToken ? (
    <PageWrapper children={component} />
  ) : (
    <Navigate to={PATH.SIGN_IN} />
  );
};

export default PrivateRoute;
