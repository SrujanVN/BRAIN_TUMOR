import { ClassInfo, TumorClass } from '../types';

export const getTumorClassInfo = (className: TumorClass): ClassInfo => {
  const classMap: Record<TumorClass, ClassInfo> = {
    glioma: {
      name: 'Glioma',
      description: 'A type of tumor that occurs in the brain and spinal cord, beginning in glial cells that surround and support nerve cells.',
      color: 'rgb(239, 68, 68)'
    },
    meningioma: {
      name: 'Meningioma',
      description: 'A tumor that forms on the membranes that cover the brain and spinal cord inside the skull. Most meningiomas are noncancerous.',
      color: 'rgb(249, 115, 22)'
    },
    notumor: {
      name: 'No Tumor',
      description: 'No tumor was detected in the scan. The brain tissue appears normal without any significant abnormalities.',
      color: 'rgb(34, 197, 94)'
    },
    pituitary: {
      name: 'Pituitary Tumor',
      description: 'A growth that develops in the pituitary gland, which is located at the base of the brain. Most pituitary tumors are noncancerous.',
      color: 'rgb(59, 130, 246)'
    }
  };
  
  return classMap[className];
};