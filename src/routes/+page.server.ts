import type { PageServerLoadEvent } from './$types';
import {
  getAllMoods
} from '$lib/storage';

export const load = async (_event: PageServerLoadEvent) => {
  const moods = await getAllMoods();
  return {
    moods
  };
}