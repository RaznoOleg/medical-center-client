import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PredictionResponse } from '../../../../redux/types/prediction.type';
import dayjs from 'dayjs';
import {
  ChartsContainer,
  ChartWrapper,
  ChartTitle
} from '../../PatientVitals/styles';

interface IPredictionsChartProps {
  predictionsData: PredictionResponse[];
}

const PredictionsChart = ({ predictionsData }: IPredictionsChartProps) => {
  const { t } = useTranslation();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return dayjs(dateString).format('DD.MM.YY');
  };

  const getRiskColor = (riskProbability: number) => {
    if (riskProbability <= 40) return '#2196F3';
    if (riskProbability <= 60) return '#4CAF50';
    if (riskProbability <= 75) return '#FF9800';
    if (riskProbability <= 85) return '#F44336';
    return '#9C27B0';
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const color = getRiskColor(payload.riskProbability);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    const color = getRiskColor(payload.riskProbability);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={color}
        stroke="#fff"
        strokeWidth={3}
      />
    );
  };

  const sortedData = [...predictionsData]
    .filter(
      (prediction) =>
        (prediction.createdAt || prediction.created_at) &&
        (prediction.risk_probability !== undefined ||
          prediction.riskProbability !== undefined)
    )
    .sort((a, b) => {
      const dateA = dayjs(a.createdAt || a.created_at).valueOf() || 0;
      const dateB = dayjs(b.createdAt || b.created_at).valueOf() || 0;
      return dateA - dateB;
    })
    .map((prediction) => {
      const riskProb =
        prediction.risk_probability ?? prediction.riskProbability ?? 0;
      const riskProbPercent = riskProb * 100;
      return {
        date: formatDate(prediction.createdAt || prediction.created_at),
        riskProbability: riskProbPercent,
        color: getRiskColor(riskProbPercent)
      };
    });

  return (
    <ChartsContainer>
      <ChartWrapper>
        <ChartTitle>{t('Patient.riskProbability')}</ChartTitle>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={sortedData}
            margin={{ top: 15, right: 25, left: 15, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#d8dbe8"
              opacity={0.6}
            />
            <XAxis
              dataKey="date"
              stroke="#585858"
              fontSize={13}
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fill: '#585858' }}
            />
            <YAxis
              stroke="#585858"
              fontSize={13}
              width={60}
              tick={{ fill: '#585858' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #4D84E7',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              formatter={(value: number) => [
                `${value.toFixed(1)}%`,
                t('Patient.riskProbability')
              ]}
              cursor={{
                stroke: '#4D84E7',
                strokeWidth: 2,
                strokeDasharray: '5 5'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="riskProbability"
              stroke="#4D84E7"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={<CustomActiveDot />}
              name={t('Patient.riskProbability')}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartsContainer>
  );
};

export default PredictionsChart;
