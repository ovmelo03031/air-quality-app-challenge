import { createContext } from 'react';

interface IContextProps {
  progress: number | null;
  updateProgress: (progressEvent: ProgressEvent) => void;
  clearProgress: () => void;
}

const IngestDataContext = createContext<IContextProps>({
  progress: null,
  updateProgress: () => {},
  clearProgress: () => {},
});
export default IngestDataContext;
