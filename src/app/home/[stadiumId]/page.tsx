import ClientHeaderWrapper from './_components/ClientHeaderWrapper/ClientHeaderWrapper';
import SelectMenu from './_components/SelectMenu/SelectMenu';
import styles from './page.module.scss';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Spacing from '@/components/Spacing/Spacing';
import Splitter from '@/components/Splitter/Splitter';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { getMetadata } from '@/utils/getMetadata';
import { findStadiumById } from '@/utils/stadium';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId } = await params;

  const { data: stadiumList } = await getStadiumList();
  const stadium = findStadiumById(stadiumList.active, Number(stadiumId));

  if (!stadium) notFound();

  const title = `${stadium.stadiumName} | 시야 정보 선택`;
  const asPath = `/home/${stadiumId}`;

  return getMetadata({
    title,
    asPath,
  });
}

const StadiumPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <>
      <ClientHeaderWrapper stadiumId={Number(stadiumId)} />
      <Splitter color="sub-gray8" />
      <Spacing size={49} />
      <main className={styles.stadiumMain}>
        <SelectMenu stadiumId={stadiumId} />
      </main>
    </>
  );
};

export default StadiumPage;
