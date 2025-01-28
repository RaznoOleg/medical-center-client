import { useTranslation } from 'react-i18next';
import {
  Language,
  LanguagePicker,
  LanguageSwitcherContainer,
  LanguageTitle,
  LanguageTitleContainer
} from './styles';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as GlobIcon } from './../../assets/common/globe.svg';
import { ReactComponent as HeaderGlobIcon } from './../../assets/common/globeHeader.svg';
import { english, ukrainian } from '../../constants/languages';
import { StyleSheetManager } from 'styled-components';

interface ILanguageSwitcher {
  isHeader?: boolean;
}

const LanguageSwitcher = ({ isHeader = false }: ILanguageSwitcher) => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const languagePickerRef = useRef<HTMLDivElement>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languagePickerRef.current &&
        !languagePickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setOpen(false);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <LanguageSwitcherContainer
        onClick={() => setOpen(!open)}
        ref={languagePickerRef}
        header={isHeader.valueOf().toString()}
      >
        <LanguageTitleContainer>
          {isHeader ? <HeaderGlobIcon /> : <GlobIcon />}
          <LanguageTitle>{selectedLanguage?.toUpperCase()}</LanguageTitle>
        </LanguageTitleContainer>
        <LanguagePicker open={open}>
          <Language
            onClick={() => changeLanguage(english)}
            selected={selectedLanguage === english}
          >
            {t('Language.english')}
          </Language>
          <Language
            onClick={() => changeLanguage(ukrainian)}
            selected={selectedLanguage === ukrainian}
          >
            {t('Language.ukrainian')}
          </Language>
        </LanguagePicker>
      </LanguageSwitcherContainer>
    </StyleSheetManager>
  );
};

export default LanguageSwitcher;
