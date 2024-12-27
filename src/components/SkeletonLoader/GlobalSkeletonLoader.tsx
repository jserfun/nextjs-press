import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GlobalSkeletonLoader = ({
  loading,
  children,
}: {
  loading: boolean;
  children: any;
}) => {
  if (!loading) {
    return children;
  }

  return (
    <SkeletonTheme
      baseColor='#202020'
      highlightColor='#444'
    >
      <div className='px-20'>
        <Skeleton count={10} />
      </div>
    </SkeletonTheme>
  );
};

export default GlobalSkeletonLoader;
