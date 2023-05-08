import MainLayout from '@components/MainLayout';
import Bookmark from '@views/Bookmark';

const index = () => <Bookmark />;

index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default index;
