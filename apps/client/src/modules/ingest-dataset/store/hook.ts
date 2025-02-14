import { useContext } from 'react';
import IngestDataContext from './context';
import IngestDatasetProvider from './provider';

const useIngestDatasetState = () => {
  const context = useContext(IngestDataContext);
  if (!context) {
    throw new Error('useIngestDatasetState must be used within a ContenidoLogContext');
  }
  return context;
};

export { useIngestDatasetState, IngestDatasetProvider };
