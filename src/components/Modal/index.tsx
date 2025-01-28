import React, { useEffect, useRef } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  Title,
  ButtonContainer,
  CancelButton
} from './styles';
import { useTranslation } from 'react-i18next';
import { StyleSheetManager } from 'styled-components';
import { ConfirmButton } from '../common/styles';

interface IModalProps {
  title: string;
  isClosing: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal = ({
  title,
  onClose,
  onConfirm,
  isClosing,
  children
}: IModalProps) => {
  const { t } = useTranslation();

  const modalRef = useRef(null);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    if (isClosing) {
      return () => clearTimeout(0);
    }
  }, [isClosing]);

  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <ModalOverlay ref={modalRef} onClick={handleClickOutside}>
        <ModalContainer
          closing={
            Boolean(isClosing) ? isClosing.valueOf.toString() : undefined
          }
        >
          <ModalContent>
            <Title>{title}</Title>
            {children}
            <ButtonContainer>
              <CancelButton
                onClick={onClose}
                disabled={false}
                type="button"
                value={t('Common.cancel')}
              />
              <ConfirmButton
                onClick={onConfirm}
                disabled={false}
                type="button"
                value={t('Common.confirm')}
              />
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    </StyleSheetManager>
  );
};

export default Modal;
