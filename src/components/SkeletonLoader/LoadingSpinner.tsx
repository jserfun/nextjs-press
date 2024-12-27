import { Hourglass } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Hourglass
        colors={['#306cce', '#72a1ed']}
        height={120}
        width={120}
      />
    </div>
  );
};

export default LoadingSpinner;
