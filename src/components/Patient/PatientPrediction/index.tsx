import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {
  useMakePredictionMutation,
  useGetPredictionByPatientIdQuery
} from '../../../redux/services/predictionApi';
import { PredictionResponse } from '../../../redux/types/prediction.type';
import {
  Title,
  NoVitalsMessage,
  ButtonContainer,
  AddButton,
  PredictionsTable,
  PredictionsTableHeader,
  PredictionsTableHeaderCell,
  PredictionsTableRow,
  PredictionsTableCell,
  RiskLevelBadge,
  SummaryList,
  SummaryItem,
  PredictionCard,
  PredictionCardHeader,
  PredictionCardTitle,
  PredictionCardContent,
  PredictionInfo,
  PredictionLabel,
  PredictionValue,
  CloseButton,
  SummaryCard
} from './styles';
import { toast } from 'react-toastify';
import { NoEvents } from '../../common/styles';
import PredictionsChart from './PredictionsChart';

interface IPatientPredictionProps {
  patientId: number;
}

const PatientPrediction = ({ patientId }: IPatientPredictionProps) => {
  const { t } = useTranslation();
  const { data: predictionsData, isLoading: isLoadingPredictions } =
    useGetPredictionByPatientIdQuery({ patientId });
  const [makePrediction, { isLoading: isPredicting }] =
    useMakePredictionMutation();
  const [newPrediction, setNewPrediction] = useState<PredictionResponse | null>(
    null
  );

  const handleGeneratePrediction = async () => {
    try {
      const result = await makePrediction({ patientId }).unwrap();
      setNewPrediction(result);
      toast.success(t('Patient.successGeneratePrediction'));
    } catch (error: any) {
      console.error('Prediction error:', error);
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error(t('Patient.errorGettingPrediction'));
      }
    }
  };

  const handleCloseCard = () => {
    setNewPrediction(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return dayjs(dateString).format('DD.MM.YY');
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return '#4CAF50';
      case 'MEDIUM':
        return '#FF9800';
      case 'HIGH':
        return '#F44336';
      case 'CRITICAL':
        return '#9C27B0';
      case 'MINIMAL':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  return (
    <>
      <ButtonContainer>
        <AddButton onClick={handleGeneratePrediction} disabled={isPredicting}>
          {t('Patient.generatePrediction')}
        </AddButton>
      </ButtonContainer>

      {newPrediction && (
        <PredictionCard>
          <PredictionCardHeader>
            <PredictionCardTitle>
              {t('Patient.newPrediction')}
            </PredictionCardTitle>
            <CloseButton onClick={handleCloseCard}>×</CloseButton>
          </PredictionCardHeader>
          <PredictionCardContent>
            <PredictionInfo>
              <PredictionLabel>{t('Patient.riskProbability')}:</PredictionLabel>
              <PredictionValue>
                {(() => {
                  const riskProb =
                    newPrediction.risk_probability ??
                    newPrediction.riskProbability ??
                    null;
                  if (riskProb === null || riskProb === undefined) {
                    return '-';
                  }
                  const numValue = parseFloat(String(riskProb));
                  if (isNaN(numValue)) {
                    return '-';
                  }
                  return `${(numValue * 100).toFixed(1)}%`;
                })()}
              </PredictionValue>
            </PredictionInfo>

            <PredictionInfo>
              <PredictionLabel>{t('Patient.riskLevel')}:</PredictionLabel>
              <RiskLevelBadge
                color={getRiskLevelColor(
                  newPrediction.risk_level ??
                    newPrediction.riskLevel ??
                    'UNKNOWN'
                )}
              >
                {t(
                  `Patient.riskLevelValues.${
                    newPrediction.risk_level ??
                    newPrediction.riskLevel ??
                    'UNKNOWN'
                  }`
                )}
              </RiskLevelBadge>
            </PredictionInfo>

            <PredictionInfo>
              <PredictionLabel>
                {t('Patient.estimatedDaysUntilComplication')}:
              </PredictionLabel>
              <PredictionValue>
                {(() => {
                  const daysUntil =
                    newPrediction.estimated_days_until_complication ??
                    newPrediction.estimatedDaysUntilComplication ??
                    null;
                  if (daysUntil === null || daysUntil === undefined) {
                    return '-';
                  }
                  const numDays = parseFloat(String(daysUntil));
                  if (isNaN(numDays)) {
                    return '-';
                  }
                  if (numDays === -1) {
                    return '-';
                  }
                  return `${numDays} ${t('Common.days')}`;
                })()}
              </PredictionValue>
            </PredictionInfo>

            {newPrediction.summary && newPrediction.summary.length > 0 && (
              <SummaryCard>
                <PredictionLabel
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}
                >
                  {t('Patient.summary')}:
                </PredictionLabel>
                <SummaryList>
                  {newPrediction.summary.map((item, index) => (
                    <SummaryItem key={index}>{item}</SummaryItem>
                  ))}
                </SummaryList>
              </SummaryCard>
            )}
          </PredictionCardContent>
        </PredictionCard>
      )}

      <Title>{t('Patient.predictions')}</Title>

      {isLoadingPredictions || isPredicting ? (
        <NoVitalsMessage>{t('Common.loading')}</NoVitalsMessage>
      ) : predictionsData && predictionsData.length > 0 ? (
        <>
          <PredictionsTable>
            <PredictionsTableHeader>
              <tr>
                <PredictionsTableHeaderCell>
                  {t('Patient.date')}
                </PredictionsTableHeaderCell>
                <PredictionsTableHeaderCell>
                  {t('Patient.riskProbability')}
                </PredictionsTableHeaderCell>
                <PredictionsTableHeaderCell>
                  {t('Patient.riskLevel')}
                </PredictionsTableHeaderCell>
                <PredictionsTableHeaderCell>
                  {t('Patient.estimatedDaysUntilComplication')}
                </PredictionsTableHeaderCell>
                <PredictionsTableHeaderCell>
                  {t('Patient.summary')}
                </PredictionsTableHeaderCell>
              </tr>
            </PredictionsTableHeader>
            <tbody>
              {predictionsData.map((prediction) => (
                <PredictionsTableRow key={prediction.id || Math.random()}>
                  <PredictionsTableCell>
                    {formatDate(prediction.createdAt || prediction.created_at)}
                  </PredictionsTableCell>
                  <PredictionsTableCell>
                    {(() => {
                      const riskProb =
                        prediction.risk_probability ??
                        prediction.riskProbability ??
                        null;
                      if (riskProb === null || riskProb === undefined) {
                        return '-';
                      }
                      const numValue = parseFloat(String(riskProb));
                      if (isNaN(numValue)) {
                        return '-';
                      }
                      return `${(numValue * 100).toFixed(1)}%`;
                    })()}
                  </PredictionsTableCell>
                  <PredictionsTableCell>
                    <RiskLevelBadge
                      color={getRiskLevelColor(
                        prediction.risk_level ??
                          prediction.riskLevel ??
                          'UNKNOWN'
                      )}
                    >
                      {t(
                        `Patient.riskLevelValues.${
                          prediction.risk_level ??
                          prediction.riskLevel ??
                          'UNKNOWN'
                        }`,
                        {
                          defaultValue:
                            prediction.risk_level ??
                            prediction.riskLevel ??
                            'Unknown'
                        }
                      )}
                    </RiskLevelBadge>
                  </PredictionsTableCell>
                  <PredictionsTableCell>
                    {(() => {
                      const daysUntil =
                        prediction.estimated_days_until_complication ??
                        prediction.estimatedDaysUntilComplication ??
                        null;
                      if (daysUntil === null || daysUntil === undefined) {
                        return '-';
                      }
                      const numDays = parseFloat(String(daysUntil));
                      if (isNaN(numDays)) {
                        return '-';
                      }
                      if (numDays === -1) {
                        return '-';
                      }
                      return `${numDays} ${t('Common.days')}`;
                    })()}
                  </PredictionsTableCell>
                  <PredictionsTableCell style={{ textAlign: 'left' }}>
                    {prediction.summary && prediction.summary.length > 0 ? (
                      <SummaryList>
                        {prediction.summary.map((item, index) => (
                          <SummaryItem key={index}>{item}</SummaryItem>
                        ))}
                      </SummaryList>
                    ) : (
                      '-'
                    )}
                  </PredictionsTableCell>
                </PredictionsTableRow>
              ))}
            </tbody>
          </PredictionsTable>

          <Title>{t('Patient.vitalsGraphics')}</Title>
          <PredictionsChart predictionsData={predictionsData} />
        </>
      ) : (
        <NoEvents>{t('Patient.noPredictions')}</NoEvents>
      )}
    </>
  );
};

export default PatientPrediction;
