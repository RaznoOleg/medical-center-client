import { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { persistor } from '../../../redux/store';
import { useAppDispatch } from '../../../redux/hooks';
import { signOut } from '../../../redux/features/slices/authSlice';
import { NavItemContainer } from '../../Navigation/styles';
import { ReactComponent as SignOutIcon } from './../../../assets/navigation/signoOut.svg';
import { toast } from 'react-toastify';

export default function SignOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    persistor.purge();
    dispatch(signOut());
    setIsModalOpen(false);
    toast.success(t('Auth.successSignOut'));
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavItemContainer onClick={showModal}>
        <SignOutIcon />
        {t('Auth.signOut')}
      </NavItemContainer>
      <Modal
        title={t('Auth.logoutText')}
        centered
        open={isModalOpen}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
      ></Modal>
    </>
  );
}
