import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Modal from '..';
import { ErrorText } from '../styles';
import Input from '../../Input';
import SelectDate from '../../SelectDate';
import { FormValues, VitalForm } from '../../common/types';
import { InputContainer, InputTitle } from '../../common/styles';
import { FormRow } from '../../Patient/PatientVitals/styles';
import {
  CreatePatientVitalData,
  UpdatePatientVitalData,
  PatientVital
} from '../../../redux/types/vitals.type';

interface IVitalModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingVital: PatientVital | null;
  patientId: number;
  onCreate: (data: CreatePatientVitalData) => Promise<void>;
  onUpdate: (id: number, data: UpdatePatientVitalData) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
}

const VitalModal = ({
  isOpen,
  setIsOpen,
  editingVital,
  patientId,
  onCreate,
  onUpdate,
  isCreating,
  isUpdating
}: IVitalModalProps) => {
  const { t } = useTranslation();
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VitalForm>({
    defaultValues: {
      systolic: '',
      diastolic: '',
      glucose: '',
      pulse: '',
      measurementTime: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (editingVital) {
        const dateStr = dayjs(editingVital.measurementTime).format(
          'DD/MM/YYYY'
        );

        reset({
          systolic: editingVital.systolic.toString(),
          diastolic: editingVital.diastolic.toString(),
          glucose: editingVital.glucose.toString(),
          pulse: editingVital.pulse.toString(),
          measurementTime: dateStr
        });
      } else {
        reset({
          systolic: '',
          diastolic: '',
          glucose: '',
          pulse: '',
          measurementTime: ''
        });
      }
      setErrorMessage('');
    }
  }, [isOpen, editingVital, reset]);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setErrorMessage('');
      reset();
      setIsClosing(false);
    }, 500);
  };

  const onSubmit = async (data: VitalForm) => {
    try {
      setErrorMessage('');
      let measurementTime = new Date().toISOString();
      if (data.measurementTime) {
        const date = dayjs(data.measurementTime, 'DD/MM/YYYY');
        if (date.isValid()) {
          measurementTime = date.toISOString();
        }
      }

      if (editingVital) {
        const vitalData: UpdatePatientVitalData = {
          systolic: Number(data.systolic),
          diastolic: Number(data.diastolic),
          glucose: Number(data.glucose),
          pulse: Number(data.pulse),
          measurementTime
        };

        await onUpdate(editingVital.id, vitalData);
        toast.success(t('Patient.successUpdateVital'));
        handleModalClose();
      } else {
        const vitalData: CreatePatientVitalData = {
          patientId,
          systolic: Number(data.systolic),
          diastolic: Number(data.diastolic),
          glucose: Number(data.glucose),
          pulse: Number(data.pulse),
          measurementTime
        };

        await onCreate(vitalData);
        toast.success(t('Patient.successCreateVital'));
        handleModalClose();
      }
    } catch (error: any) {
      setErrorMessage(
        editingVital ? 'Failed to update vital' : 'Failed to create vital'
      );
    }
  };

  const handleConfirm = () => {
    if (isCreating || isUpdating) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title={editingVital ? t('Patient.editVital') : t('Patient.addVital')}
      onClose={handleModalClose}
      onConfirm={handleConfirm}
      isClosing={isClosing}
    >
      <>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <FormRow>
          <InputContainer>
            <InputTitle>{t('Patient.systolic')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name="systolic"
              placeholder={t('Patient.enterSystolic')}
              helperText={errors.systolic?.message}
              error={Boolean(errors.systolic)}
              required={true}
            />
          </InputContainer>

          <InputContainer>
            <InputTitle>{t('Patient.diastolic')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name="diastolic"
              placeholder={t('Patient.enterDiastolic')}
              helperText={errors.diastolic?.message}
              error={Boolean(errors.diastolic)}
              required={true}
            />
          </InputContainer>
        </FormRow>

        <FormRow>
          <InputContainer>
            <InputTitle>{t('Patient.glucose')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name="glucose"
              placeholder={t('Patient.enterGlucose')}
              helperText={errors.glucose?.message}
              error={Boolean(errors.glucose)}
              required={true}
            />
          </InputContainer>

          <InputContainer>
            <InputTitle>{t('Patient.pulse')}</InputTitle>
            <Input
              control={control as Control<FormValues>}
              fullWidth
              name="pulse"
              placeholder={t('Patient.enterPulse')}
              helperText={errors.pulse?.message}
              error={Boolean(errors.pulse)}
              required={true}
            />
          </InputContainer>
        </FormRow>
        <FormRow>
          <InputContainer>
            <InputTitle>{t('Patient.measurementTime')}</InputTitle>
            <SelectDate
              control={control as Control<FormValues>}
              name="measurementTime"
              helperText={errors.measurementTime?.message}
              error={Boolean(errors?.measurementTime)}
              required={true}
            />
          </InputContainer>
        </FormRow>
      </>
    </Modal>
  );
};

export default VitalModal;
