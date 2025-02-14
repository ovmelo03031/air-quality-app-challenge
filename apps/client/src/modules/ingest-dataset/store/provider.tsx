import React, { FC, useState } from 'react';

import IngestDataContext from './context';

const IngestDatasetProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, SetProgress] = useState<number | null>(null);

  const updateProgress = (progressEvent: ProgressEvent) => {
    const value = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    SetProgress(value);
  };

  const clearProgress = () => {
    SetProgress(null);
  };

  return (
    <IngestDataContext value={{ progress, updateProgress, clearProgress }}>
      {children}
    </IngestDataContext>
  );
};

export default IngestDatasetProvider;
