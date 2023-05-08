import MainLayout from '@components/MainLayout';
import List from '@views/List';

const index = () => <List />;

index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default index;
