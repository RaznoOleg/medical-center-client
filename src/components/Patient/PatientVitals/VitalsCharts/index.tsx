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
import { PatientVital } from '../../../../redux/types/vitals.type';
import dayjs from 'dayjs';
import { ChartsContainer, ChartWrapper, ChartTitle } from '../styles';

interface IVitalsChartsProps {
  vitalsData: PatientVital[];
}

const VitalsCharts = ({ vitalsData }: IVitalsChartsProps) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD.MM.YY');
  };

  const sortedData = [...vitalsData]
    .sort(
      (a, b) =>
        dayjs(a.measurementTime).valueOf() - dayjs(b.measurementTime).valueOf()
    )
    .map((vital) => ({
      ...vital,
      date: formatDate(vital.measurementTime)
    }));

  const bloodPressureData = sortedData.map((vital) => ({
    date: vital.date,
    systolic: vital.systolic,
    diastolic: vital.diastolic
  }));

  const glucoseData = sortedData.map((vital) => ({
    date: vital.date,
    glucose: vital.glucose
  }));

  const pulseData = sortedData.map((vital) => ({
    date: vital.date,
    pulse: vital.pulse
  }));

  return (
    <ChartsContainer>
      <ChartWrapper>
        <ChartTitle>{t('Patient.bloodPressure')}</ChartTitle>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={bloodPressureData}
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #4D84E7',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              cursor={{
                stroke: '#4D84E7',
                strokeWidth: 2,
                strokeDasharray: '5 5'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#E9380D"
              strokeWidth={3}
              dot={{ r: 5, fill: '#E9380D', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#E9380D' }}
              name={t('Patient.systolic')}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#7B2CBF"
              strokeWidth={3}
              dot={{ r: 5, fill: '#7B2CBF', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#7B2CBF' }}
              name={t('Patient.diastolic')}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <ChartWrapper>
        <ChartTitle>{t('Patient.glucose')}</ChartTitle>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={glucoseData}
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #00a344',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              cursor={{
                stroke: '#00a344',
                strokeWidth: 2,
                strokeDasharray: '5 5'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="glucose"
              stroke="#00a344"
              strokeWidth={3}
              dot={{ r: 5, fill: '#00a344', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#00a344' }}
              name={t('Patient.glucose')}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <ChartWrapper>
        <ChartTitle>{t('Patient.pulse')}</ChartTitle>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={pulseData}
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #FF6B35',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              cursor={{
                stroke: '#FF6B35',
                strokeWidth: 2,
                strokeDasharray: '5 5'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="pulse"
              stroke="#FF6B35"
              strokeWidth={3}
              dot={{ r: 5, fill: '#FF6B35', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#FF6B35' }}
              name={t('Patient.pulse')}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartsContainer>
  );
};

export default VitalsCharts;
