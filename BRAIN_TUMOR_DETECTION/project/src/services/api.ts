import axios from 'axios';
import { PredictionResult } from '../types';

// In production, use an environment variable or fetch from your config
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const uploadImage = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    
    if (import.meta.env.DEV) {
      // For development purposes only, return mock data
      console.log('Using mock data for development');
      return getMockPrediction();
    }
    
    throw new Error('Failed to process image. Please try again later.');
  }
};

// Helper function to simulate API response during development
const getMockPrediction = (): PredictionResult => {
  const classes: Array<PredictionResult['class']> = ['glioma', 'meningioma', 'notumor', 'pituitary'];
  const randomClass = classes[Math.floor(Math.random() * classes.length)];
  const randomConfidence = Math.round((0.7 + Math.random() * 0.29) * 100) / 100;
  
  return {
    class: randomClass,
    confidence: randomConfidence
  };
};