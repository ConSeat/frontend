import SingleFunnel from './_components/SingleFunnel/SingleFunnel';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { getMetadata } from '@/utils/getMetadata';
import { findStadiumById } from '@/utils/stadium';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId } = await params;

  const { data: stadiumList } = await getStadiumList();
  const stadium = findStadiumById(stadiumList.active, Number(stadiumId));

  if (!stadium) notFound();

  const title = `${stadium.stadiumName} | 구역 선택 `;

  return getMetadata({
    title,
  });
}

const SinglePage = async ({ params }) => {
  const { stadiumId } = await params;

  return <SingleFunnel stadiumId={Number(stadiumId)} />;
};

export default SinglePage;
