import MainLayout from '@components/MainLayout';
import Anime from '@views/Anime';

const index = () => <Anime />;

index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default index;
