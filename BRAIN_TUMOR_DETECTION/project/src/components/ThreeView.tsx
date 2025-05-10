import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { getTumorClassInfo } from '../utils/tumorClasses';
import { TumorClass } from '../types';

interface ThreeViewProps {
  imageUrl: string;
  tumorClass: TumorClass;
}

const ImageSlices: React.FC<{ 
  imageUrl: string;
  color: string;
  tumorClass: TumorClass;
}> = ({ imageUrl, color, tumorClass }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const groupRef = useRef<THREE.Group>(null);
  
  // Convert hex color to THREE.Color
  const tumorColor = new THREE.Color(color);
  
  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation animation
      groupRef.current.rotation.y += 0.001;
    }
  });

  const slices = Array.from({ length: 8 }, (_, i) => {
    const z = (i - 3.5) * 0.2;
    const opacity = 1 - Math.abs(z) * 0.2;
    return (
      <mesh key={i} position={[0, 0, z]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true} 
          opacity={opacity}
          alphaTest={0.1}
          color="white"
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  });

  // Add a glowing halo effect around the tumor area (simulated)
  const glowPosition = tumorClass !== 'notumor' ? [
    Math.random() * 0.8 - 0.4,  // Random position for demo
    Math.random() * 0.8 - 0.4,
    0.5
  ] : [0, 0, 100]; // Position far away if no tumor
  
  return (
    <group ref={groupRef}>
      {slices}
      
      {/* Glow effect */}
      <mesh position={glowPosition}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial 
          color={tumorColor} 
          transparent={true} 
          opacity={0.2}
        />
      </mesh>
      
      {/* More intense inner glow */}
      <mesh position={glowPosition}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial 
          color={tumorColor} 
          transparent={true} 
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

const ThreeView: React.FC<ThreeViewProps> = ({ imageUrl, tumorClass }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const classInfo = getTumorClassInfo(tumorClass);
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      
      <React.Suspense fallback={null}>
        <ImageSlices 
          imageUrl={imageUrl} 
          color={classInfo.color} 
          tumorClass={tumorClass}
        />
      </React.Suspense>
      
      <OrbitControls 
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
};

export default ThreeView;