import { Control, useForm } from 'react-hook-form';
import { ConfirmButton, InputContainer, InputTitle } from '../../common/styles';
import {
  ButtonContainer,
  Form,
  InputInlineContainer,
  PatientInfoWrapper,
  SelectContainer,
  Text
} from '../styles';
import { BookAppointment, FormValues } from '../../common/types';
import { useTranslation } from 'react-i18next';
import PatientInfo from '../../Patient/PatientInfo';
import SelectInput from '../../Input/SelectInput';
import {
  date,
  doctor,
  specialization,
  time
} from '../../../constants/inputName';
import CancelButton from '../../CancelButton';
import { useGetAllUsersBySpecQuery } from '../../../redux/services/userApi';
import { useEffect, useState } from 'react';
import { User } from '../../../redux/types/user.type';
import { useGetAllAvailabilitiesByUserIdAndDayQuery } from '../../../redux/services/availabilityApi';
import { Availability } from '../../../redux/types/availability.type';
import { formatDate } from 'date-fns';
import AvailabilitySchema from '../../../validation/availability.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateAppointmentMutation,
  useGetAllAppointmentsByUserIdQuery
} from '../../../redux/services/appointmentApi';
import { toast } from 'react-toastify';
import { timeFormat } from '../../../constants/format';
import { useSpecializations } from '../../../constants/mockData';
import SelectDate from '../../SelectDate';
import { reformatDate } from '../../../utils/functions/reformatDate';

const BookAppointmentForm = () => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const { id: patientId } = useParams();

  const { bookAppointment } = AvailabilitySchema();

  const [doctors, setDoctors] = useState<User[]>([]);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [createAppointment, { isSuccess }] = useCreateAppointmentMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<BookAppointment>({
    mode: 'onChange',
    defaultValues: {
      specialization: '',
      doctor: '',
      date: '',
      time: ''
    },
    resolver: yupResolver(bookAppointment)
  });

  const selectedSpec = watch(specialization);
  const selectedDoctor = watch(doctor);
  const selectedDate = watch(date);

  const { data: doctorsData } = useGetAllUsersBySpecQuery(
    {
      specialization: selectedSpec
    },
    { skip: selectedSpec === '' }
  );

  const { data: availabilityData } = useGetAllAvailabilitiesByUserIdAndDayQuery(
    {
      userId: selectedDoctor,
      selectedDay: reformatDate(selectedDate)
    },
    {
      skip: selectedDoctor === '' || selectedDate === ''
    }
  );

  const { data: appointmentsData } = useGetAllAppointmentsByUserIdQuery(
    {
      userId: Number(selectedDoctor)
    },
    {
      skip: selectedDoctor === '' || selectedDate === ''
    }
  );

  useEffect(() => {
    if (doctorsData) {
      setDoctors(doctorsData);
    }
    if (availabilityData && appointmentsData) {
      const filteredAvailabilities = availabilityData.filter((availability) => {
        return !appointmentsData.some((appointment) => {
          return (
            appointment.startTime < availability.endTime &&
            appointment.endTime > availability.startTime
          );
        });
      });
      setAvailabilities(filteredAvailabilities);
    }
  }, [appointmentsData, availabilityData, doctorsData]);

  const handleReset = () => {
    reset();
  };

  const onSubmit = async (data: BookAppointment) => {
    try {
      const selectedTime = JSON.parse(data.time);

      if (patientId) {
        const appointmentData = {
          startTime: selectedTime.startTime as Date,
          endTime: selectedTime.endTime as Date,
          userId: +data.doctor,
          patientId: +patientId
        };
        await createAppointment(appointmentData).unwrap();
      }
    } catch (error) {
      toast.error(t('Error.alreadyHaveAppointment'));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('Appointment.successCreateAppointment'));
      navigate(`/patient/${patientId}`);
    }
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text>{t('Appointment.bookPatient')}</Text>
      <InputInlineContainer />
      <PatientInfoWrapper>
        <PatientInfo isEdit={false} patientId={Number(patientId)} />
      </PatientInfoWrapper>
      <InputInlineContainer />
      <SelectContainer>
        <InputContainer>
          <InputTitle>{t('Appointment.selectSpecialization')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={specialization}
            placeholder={t('Appointment.enterSpecialization')}
            options={specializations.filter((spec) => spec.value !== 0)}
            helperText={errors.specialization?.message}
            error={Boolean(errors?.specialization)}
            required={true}
          />
        </InputContainer>
      </SelectContainer>
      <SelectContainer>
        <InputContainer>
          <InputTitle>{t('Appointment.selectDoctor')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={doctor}
            placeholder={t('Appointment.enterDoctor')}
            options={doctors.map((doctor) => ({
              label: `${doctor.firstName} ${doctor.lastName}`,
              value: doctor.id || ''
            }))}
            helperText={errors.doctor?.message}
            error={Boolean(errors?.doctor)}
            required={true}
          />
        </InputContainer>
        <InputInlineContainer />
        <InputContainer>
          <InputTitle>{t('Appointment.selectDate')}</InputTitle>
          <SelectDate
            control={control as Control<FormValues>}
            name={date}
            helperText={errors.date?.message}
            error={Boolean(errors?.date)}
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>{t('Appointment.selectTime')}</InputTitle>
          <SelectInput
            control={control as Control<FormValues>}
            fullWidth
            name={time}
            placeholder={t('Appointment.enterTime')}
            options={availabilities.map((availability) => ({
              label: `${formatDate(new Date(availability.startTime), timeFormat)} - ${formatDate(new Date(availability.endTime), timeFormat)}`,
              value: JSON.stringify({
                startTime: availability.startTime,
                endTime: availability.endTime
              })
            }))}
            helperText={errors.time?.message}
            error={Boolean(errors?.time)}
            required={true}
          />
        </InputContainer>
      </SelectContainer>
      <InputInlineContainer />
      <SelectContainer>
        <ButtonContainer>
          <CancelButton
            onReset={handleReset}
            isDisabled={false}
            title={'Profile.cancelTitle'}
          />
          <ConfirmButton
            disabled={!isValid}
            type="submit"
            value={t('Common.create')}
          />
        </ButtonContainer>
      </SelectContainer>
    </Form>
  );
};

export default BookAppointmentForm;
