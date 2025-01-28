import { useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../redux/features/slices/authSlice';
import { PATH } from '../../../constants/routes';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function GoogleRedirect() {
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get('gtoken');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      toast.success(t('Auth.successSignIn'));
      dispatch(setAuthToken({ accessToken: accessToken }));
      navigate(PATH.PROFILE);
    }
  });

  return <></>;
}

export default GoogleRedirect;
