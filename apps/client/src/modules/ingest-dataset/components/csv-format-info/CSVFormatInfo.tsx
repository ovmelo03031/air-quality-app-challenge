import { AlertCircle } from 'lucide-react';

const CSVFormatInfo = () => (
  <div className='bg-muted/50 rounded-lg p-4 space-y-2'>
    <h4 className='font-medium'>Required CSV Format</h4>
    <p className='text-sm text-muted-foreground'>
      The CSV file should have the following columns:
    </p>
    <pre className='text-xs bg-muted p-2 rounded text-wrap'>
      Date, Time, CO(GT), NMHC(GT), C6H6(GT), NOx(GT), NO2(GT) and others
    </pre>
    <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
      <AlertCircle className='size-4' />
      <span>
        Make sure your Date are in <strong>DD/MM/YYYY</strong> format and Time in{' '}
        <strong>HH.mm.ss</strong> format
      </span>
    </div>
  </div>
);

export default CSVFormatInfo;
