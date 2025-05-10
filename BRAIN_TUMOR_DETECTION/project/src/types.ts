export interface PredictionResult {
  class: 'glioma' | 'meningioma' | 'notumor' | 'pituitary';
  confidence: number;
}

export type TumorClass = 'glioma' | 'meningioma' | 'notumor' | 'pituitary';

export interface ClassInfo {
  name: string;
  description: string;
  color: string;
}