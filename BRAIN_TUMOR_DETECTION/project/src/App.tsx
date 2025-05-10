import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Upload from './components/Upload';
import Result from './components/Result';
import { PredictionResult } from './types';
import { uploadImage } from './services/api';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prediction = await uploadImage(file);
      setResult(prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('An error occurred during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="container mx-auto flex flex-1 flex-col px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-1 flex-col gap-8 md:gap-12"
        >
          {!result ? (
            <Upload 
              file={file}
              imageUrl={imageUrl} 
              isLoading={isLoading}
              onFileChange={handleFileChange}
              onPredict={handlePredict}
              error={error}
            />
          ) : (
            <Result 
              result={result} 
              imageUrl={imageUrl!}
              onReset={resetState}
            />
          )}
        </motion.div>
      </main>
      
      <footer className="bg-transparent py-6 text-center text-sm text-white/70 backdrop-blur-md">

        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Brain Tumor Detection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;