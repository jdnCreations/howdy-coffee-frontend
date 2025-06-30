interface ErrorDisplayProps {
  error: string;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className='flex align-center justify-center my-4'>
      <div className='bg-red-800 rounded rounded-md w-[600px] flex flex-col p-4'>
        <h1 className='text-3xl font-bold text-red-200 pb-2'>Error</h1>
        <p className='text-red-300 font-medium text-xl mb-4'>{error}</p>
      </div>
    </div>
  );
}
