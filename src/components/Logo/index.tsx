import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from './../../assets/common/logo.svg';
import { LogoContainer, LogoImg, LogoTitle } from './styles';

function Logo() {
  const { t } = useTranslation();

  return (
    <LogoContainer>
      <LogoImg src={logo} />
      <LogoTitle>{t('Logo.title')}</LogoTitle>
    </LogoContainer>
  );
}
export default Logo;
