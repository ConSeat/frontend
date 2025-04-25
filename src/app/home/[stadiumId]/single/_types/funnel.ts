import type { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';

export type Step = (typeof SINGLE_FUNNEL_STEPS)[number];

export interface SingleFunnelData {
  sectionId: number;
  sectionName: string;
  seatingId: number;
}
