import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AccordionBody,
  Arrow,
  Container,
  EditCardLink,
  PatientName
} from './styles';
import { StyleSheetManager } from 'styled-components';
import { HighlightedText } from '../../HighlightText';

interface ICardWrapper {
  children: React.ReactNode;
  title: string;
  searchValue: string;
  id?: number;
}

const CardWrapper: React.FC<ICardWrapper> = ({
  children,
  title,
  searchValue,
  id
}) => {
  const { t } = useTranslation();

  const [toggle, setToggle] = React.useState<boolean>(false);
  const [heightEl, setHeightEl] = React.useState<string>();

  const refHeight = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (refHeight.current) setHeightEl(`${refHeight.current.scrollHeight}px`);
  }, []);

  const toggleState = (): void => {
    setToggle(!toggle);
  };

  return (
    <>
      <StyleSheetManager shouldForwardProp={() => true}>
        <Container>
          <PatientName onClick={toggleState}>
            <HighlightedText searchValue={searchValue} text={title} />
            <Arrow toggle={(!toggle).toString()} />
          </PatientName>
          {id && (
            <EditCardLink to={`/edit-patient/${id}`}>
              {t('Patients.editCard')}
            </EditCardLink>
          )}
        </Container>
        <AccordionBody
          toggle={toggle.toString()}
          style={{
            height: toggle ? `${heightEl}` : '0px',
            overflow: 'hidden',
            transition: '0.3s all'
          }}
          ref={refHeight}
        >
          {children}
        </AccordionBody>
      </StyleSheetManager>
    </>
  );
};

export default CardWrapper;
