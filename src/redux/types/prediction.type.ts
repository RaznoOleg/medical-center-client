export interface PredictionDto {
  patientId: number;
}

export interface PredictionResponse {
  id?: number;
  risk_probability?: number;
  riskProbability?: number;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'MINIMAL';
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'MINIMAL';
  estimated_days_until_complication?: number;
  estimatedDaysUntilComplication?: number;
  summary?: string[];
  createdAt?: string;
  created_at?: string;
}
