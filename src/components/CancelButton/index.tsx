import { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CancelContainer } from './styles';

interface ICancelButtonProps {
  title: string;
  isDisabled: boolean;
  onReset: () => void;
}

export default function CancelButton({
  title,
  isDisabled,
  onReset
}: ICancelButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onReset();
    setIsModalOpen(false);
    toast.info(t('Common.successCancel'));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CancelContainer
        type="button"
        disabled={isDisabled}
        onClick={showModal}
        value={t('Common.cancel')}
      />
      <Modal
        title={t(`${title}`)}
        centered
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}
