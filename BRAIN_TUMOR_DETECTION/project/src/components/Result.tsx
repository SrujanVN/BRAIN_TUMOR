import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Info } from 'lucide-react';
import { PredictionResult } from '../types';
import { getTumorClassInfo } from '../utils/tumorClasses';
import ThreeView from './ThreeView';

interface ResultProps {
  result: PredictionResult;
  imageUrl: string;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ result, imageUrl, onReset }) => {
  const classInfo = getTumorClassInfo(result.class);
  const confidence = Math.round(result.confidence * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8 flex flex-col items-center"
    >
      <div className="mb-8 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white text-shadow">Analysis Results</h2>
        <p className="text-lg text-white text-shadow">
          Our advanced  model has analyzed your brain scan and generated the following prediction.
        </p>
      </div>

      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
        <div className="result-card">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Prediction</h3>
          
          <div className="mb-6 stats-card">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-gray-700">Class</span>
                <span 
                  className="rounded-full px-3 py-1 text-sm font-medium" 
                  style={{ 
                    backgroundColor: `${classInfo.color}20`, 
                    color: classInfo.color 
                  }}
                >
                  {classInfo.name}
                </span>
              </div>
              
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-gray-700">Confidence</span>
                <span className="font-medium text-gray-900">{confidence}%</span>
              </div>
              
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full" 
                  style={{ backgroundColor: classInfo.color }}
                />
              </div>
            </div>
            
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="mb-2 flex items-start">
                <Info className="mr-2 h-5 w-5 shrink-0 text-primary-500" />
                <h4 className="font-medium text-gray-900">{classInfo.name}</h4>
              </div>
              <p className="text-gray-700">{classInfo.description}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="mb-2 font-medium text-gray-800">Original Scan</h4>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={imageUrl} alt="Original scan" className="h-auto w-full object-contain" />
            </div>
          </div>
          
          <button
            onClick={onReset}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <RotateCcw className="h-5 w-5" />
            Upload New Image
          </button>
        </div>
        
        <div className="result-card">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">3D Visualization</h3>
          <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-50 shadow-inner md:h-96">
            <ThreeView imageUrl={imageUrl} tumorClass={result.class} />
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Use mouse to rotate, scroll to zoom, and right-click to pan
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Result;