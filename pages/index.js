import MainLayout from '@components/MainLayout';
import Home from '@views/Home';

const index = () => <Home />;

index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default index;
