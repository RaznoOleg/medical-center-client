import { ChangeEvent, useEffect, useState } from 'react';
import defaultUserPhoto from '../../assets/user/defaultUserPhoto.png';
import { Modal, Spin } from 'antd';
import {
  PhotoContainer,
  UserPhoto,
  ChangePhotoButton,
  CropperContainer,
  PhotoInput,
  LoaderContainer
} from './styles';
import { ReactComponent as PencilIcon } from './../../assets/user/pencilEditButton.svg';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { allowedPhotoFileType, photoFileTypes } from '../../constants/file';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useUpdateUserPhotoMutation } from '../../redux/services/userApi';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/selectors/userSelector';

function PhotoUpload() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const user = useAppSelector(selectUser);

  const [updateUserPhoto, { isSuccess, isLoading }] =
    useUpdateUserPhotoMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (!file) {
        toast.error(t('File.error'));
        return;
      }
      if (!allowedPhotoFileType.includes(file.type)) {
        toast.error(t('File.photoTypeError'));
        return;
      }

      setIsModalOpen(true);
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (cropper && selectedImage) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], selectedImage.name, {
              type: selectedImage.type
            })
        );

      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        try {
          await updateUserPhoto(formData).unwrap();
        } catch (error) {
          toast.error(t('File.uploadError'));
        }
      }
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedImage(null);
      setIsModalOpen(false);
      toast.success(t('File.uploadSuccess'));
    }
  }, [isSuccess, t]);

  return (
    <PhotoContainer>
      <UserPhoto
        src={user?.photoUrl ? user.photoUrl : defaultUserPhoto}
        alt="Profile photo"
      />
      <ChangePhotoButton title={t('File.changePhoto')} htmlFor="profilePhoto">
        <PencilIcon />
      </ChangePhotoButton>
      <PhotoInput
        type="file"
        id="profilePhoto"
        accept={photoFileTypes}
        onChange={handleOnChange}
      />
      {selectedImage && (
        <Modal
          title={t('File.modalTitle')}
          width={550}
          centered
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          {isLoading ? (
            <LoaderContainer>
              <Spin size="large" />
            </LoaderContainer>
          ) : (
            <CropperContainer>
              <Cropper
                src={URL.createObjectURL(selectedImage)}
                style={{ height: 500, width: 500, borderRadius: '50%' }}
                initialAspectRatio={1}
                aspectRatio={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                guides={false}
                checkOrientation={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            </CropperContainer>
          )}
        </Modal>
      )}
    </PhotoContainer>
  );
}

export default PhotoUpload;
