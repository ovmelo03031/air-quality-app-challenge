interface ModuleHeaderProps extends React.PropsWithChildren {
  title: string;
}
const ModuleHeader = ({ title, children }: ModuleHeaderProps) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-2'>
      <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      {children}
    </div>
  );
};

export default ModuleHeader;
