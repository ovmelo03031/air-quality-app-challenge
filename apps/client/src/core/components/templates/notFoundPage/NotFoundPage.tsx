const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center bg-muted'>
      <h1 className='text-8xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
      <p className='text-muted-foreground'>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
