import SelectMenu from './_components/SelectMenu/SelectMenu';
import styles from './page.module.scss';
import Spacing from '@/components/Spacing/Spacing';
import Splitter from '@/components/Splitter/Splitter';

const StadiumPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <>
      <Splitter color="sub-gray8" />
      <Spacing size={49} />
      <main className={styles.stadiumMain}>
        <SelectMenu stadiumId={stadiumId} />
      </main>
    </>
  );
};

export default StadiumPage;
