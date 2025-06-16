import { notFound, redirect } from 'next/navigation';
import ApiRequestError from '@/utils/ApiRequestError';

export async function fetchOrHandle<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof ApiRequestError) {
      if (e.status === 404) {
        notFound();
      }
      if (e.status === 401) {
        redirect('/login');
      }
    }
    throw e;
  }
}
