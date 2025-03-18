import { Compare, Pencil, Seat } from '@/assets';

export const FIND_VIEW_LIST = [
  {
    type: 'single',
    Icon: <Seat />,
    title: '구역별 시야 찾기',
  },
  {
    type: 'compare',
    Icon: <Compare />,
    title: '시야 비교하기',
  },
  {
    type: 'review',
    Icon: <Pencil />,
    title: '시야 후기 작성하기',
  },
];
