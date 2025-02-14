import { useContext } from 'react';
import VirtualTableContext from './context';

function useVirtualTable() {
  const context = useContext(VirtualTableContext);
  if (!context) {
    throw new Error('useVirtualTable must be used within an VirtualTableProvider');
  }
  return context;
}

export default useVirtualTable;