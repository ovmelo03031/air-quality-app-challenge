interface InfoReadingLabelProps {
  label: string;
  value: number;
  unit: string;
  valueClassName?: string;
}

const InfoReadingLabel: React.FC<InfoReadingLabelProps> = ({
  label,
  value,
  unit,
  valueClassName = 'text-2xl font-bold',
}) => {
  return (
    <div>
      <p className='text-sm font-medium'>
        {label}&nbsp;({unit})
      </p>
      <p className={valueClassName}>{value.toFixed(2)}</p>
    </div>
  );
};

export default InfoReadingLabel;
