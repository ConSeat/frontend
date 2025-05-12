import DelayLoading from '@/components/DelayLoading/DelayLoading';
import PageLoading from '@/components/PageLoading';

const loading = () => {
  return (
    <DelayLoading>
      <PageLoading />
    </DelayLoading>
  );
};

export default loading;
