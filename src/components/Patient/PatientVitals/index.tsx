import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import {
  useGetVitalsByPatientQuery,
  useCreateVitalMutation,
  useUpdateVitalMutation,
  useDeleteVitalMutation
} from '../../../redux/services/vitalsApi';
import {
  CreatePatientVitalData,
  UpdatePatientVitalData,
  PatientVital
} from '../../../redux/types/vitals.type';
import VitalsCharts from './VitalsCharts';
import VitalModal from '../../Modal/VitalModal';
import DeleteVitalModal from '../../Modal/DeleteVitalModal';
import { toast } from 'react-toastify';
import {
  ButtonContainer,
  Title,
  AddButton,
  NoVitalsMessage,
  VitalsTable,
  VitalsTableHeader,
  VitalsTableHeaderCell,
  VitalsTableRow,
  VitalsTableCell,
  EditButton,
  DeleteButton,
  ActionsContainer
} from './styles';
import { NoEvents } from '../../common/styles';

interface IPatientVitalsProps {
  patientId: number;
}

const PatientVitals = ({ patientId }: IPatientVitalsProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVital, setEditingVital] = useState<PatientVital | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vitalToDelete, setVitalToDelete] = useState<PatientVital | null>(null);

  const { data: vitalsData, isLoading } = useGetVitalsByPatientQuery({
    patientId
  });
  const [createVital, { isLoading: isCreating }] = useCreateVitalMutation();
  const [updateVital, { isLoading: isUpdating }] = useUpdateVitalMutation();
  const [deleteVital] = useDeleteVitalMutation();

  const handleAddClick = () => {
    setEditingVital(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vital: PatientVital) => {
    setEditingVital(vital);
    setIsModalOpen(true);
  };

  const handleCreate = async (vitalData: CreatePatientVitalData) => {
    await createVital(vitalData).unwrap();
  };

  const handleUpdate = async (
    id: number,
    vitalData: UpdatePatientVitalData
  ) => {
    await updateVital({ id, vitalData }).unwrap();
  };

  const handleDeleteClick = (vital: PatientVital) => {
    setVitalToDelete(vital);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteVital = async () => {
    if (vitalToDelete) {
      try {
        await deleteVital({ id: vitalToDelete.id }).unwrap();
        toast.success(t('Patient.successDeleteVital'));
        setIsDeleteModalOpen(false);
        setVitalToDelete(null);
      } catch (error) {
        toast.error(t('Patient.errorDeleteVital') || 'Failed to delete vital');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD.MM.YY');
  };

  return (
    <>
      <ButtonContainer>
        <AddButton onClick={handleAddClick}>{t('Patient.addVital')}</AddButton>
      </ButtonContainer>

      <Title>{t('Patient.vitals')}</Title>

      <VitalModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        editingVital={editingVital}
        patientId={patientId}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        isCreating={isCreating}
        isUpdating={isUpdating}
      />

      <DeleteVitalModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        vital={vitalToDelete}
        handleDeleteVital={handleDeleteVital}
      />

      {isLoading ? (
        <NoVitalsMessage>{t('Common.loading')}</NoVitalsMessage>
      ) : vitalsData && vitalsData.length > 0 ? (
        <>
          <VitalsTable>
            <VitalsTableHeader>
              <tr>
                <VitalsTableHeaderCell>
                  {t('Patient.date')}
                </VitalsTableHeaderCell>
                <VitalsTableHeaderCell>
                  {t('Patient.systolic')}
                </VitalsTableHeaderCell>
                <VitalsTableHeaderCell>
                  {t('Patient.diastolic')}
                </VitalsTableHeaderCell>
                <VitalsTableHeaderCell>
                  {t('Patient.glucose')}
                </VitalsTableHeaderCell>
                <VitalsTableHeaderCell>
                  {t('Patient.pulse')}
                </VitalsTableHeaderCell>
                <VitalsTableHeaderCell>
                  {t('Common.actions')}
                </VitalsTableHeaderCell>
              </tr>
            </VitalsTableHeader>
            <tbody>
              {vitalsData.map((vital) => (
                <VitalsTableRow key={vital.id}>
                  <VitalsTableCell>
                    {formatDate(vital.measurementTime)}
                  </VitalsTableCell>
                  <VitalsTableCell>{vital.systolic}</VitalsTableCell>
                  <VitalsTableCell>{vital.diastolic}</VitalsTableCell>
                  <VitalsTableCell>{vital.glucose}</VitalsTableCell>
                  <VitalsTableCell>{vital.pulse}</VitalsTableCell>
                  <VitalsTableCell>
                    <ActionsContainer>
                      <EditButton onClick={() => handleEdit(vital)}>
                        {t('Common.edit')}
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteClick(vital)}>
                        <Trash size={24} />
                      </DeleteButton>
                    </ActionsContainer>
                  </VitalsTableCell>
                </VitalsTableRow>
              ))}
            </tbody>
          </VitalsTable>

          <Title>{t('Patient.vitalsGraphics')}</Title>
          <VitalsCharts vitalsData={vitalsData} />
        </>
      ) : (
        <NoEvents>{t('Patient.noVitals')}</NoEvents>
      )}
    </>
  );
};

export default PatientVitals;
