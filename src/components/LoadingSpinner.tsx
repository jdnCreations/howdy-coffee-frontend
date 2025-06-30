export default function LoadingSpinner() {
  return (
    <div className='w-full flex items-center justify-center '>
      <div className='rounded rounded-full bg-amber-400 w-[80px] h-[80px] flex items-center justify-center'>
        <img
          className='h-[50px] w-[50px] animate-spin'
          src='/coffee-cup.png'
          alt=''
        />
      </div>
    </div>
  );
}
