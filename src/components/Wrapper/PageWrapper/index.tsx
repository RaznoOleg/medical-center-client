import React, { useEffect, useState } from 'react';
import {
  MainContent,
  NotVerifiedContainer,
  PageContainer,
  ResendLinkButton,
  SuccessUpdateContainer,
  Title
} from './styles';
import Navigation from '../../Navigation';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/features/selectors/userSelector';
import { useTranslation } from 'react-i18next';
import { useUpdateActivationLinkMutation } from '../../../redux/services/authApi';
import { toast } from 'react-toastify';
import Loader from '../../Loader';
import { ReactComponent as CheckMarkIcon } from './../../../assets/auth/checkmark.svg';

interface IWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: IWrapperProps) => {
  const { t } = useTranslation();

  const user = useAppSelector(selectUser);

  const [isUserLoading, setIsUserLoading] = useState(true);

  const [updateActivationLink, { isLoading, isSuccess }] =
    useUpdateActivationLinkMutation();

  useEffect(() => {
    if (user !== null) {
      setIsUserLoading(false);
    }
  }, [user]);

  const handleResendLink = async () => {
    try {
      await updateActivationLink({ id: user?.id }).unwrap();
    } catch (error) {
      toast.error(t('Error.smtWentWrong'), { position: 'top-center' });
    }
  };

  return (
    <PageContainer>
      <Navigation />
      <MainContent>
        {isLoading || isUserLoading ? (
          <Loader />
        ) : isSuccess ? (
          <SuccessUpdateContainer>
            <CheckMarkIcon />
            {t('Auth.linkResentSuccessfully')}
          </SuccessUpdateContainer>
        ) : user?.isVerified ? (
          children
        ) : (
          <NotVerifiedContainer>
            <Title>{t('Auth.welcome')}</Title>
            {t('Auth.notVerified')}
            <ResendLinkButton onClick={handleResendLink}>
              {t('Auth.resendLink')}
            </ResendLinkButton>
            {t('Auth.thanks')}
          </NotVerifiedContainer>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default PageWrapper;
