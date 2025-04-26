const v =
  'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsInN1YiI6IjA4NGIyMjYwLWYzMDQtNGRmYy05ZGI1LTQ5ZmY2OWQ0NmZkMyIsImV4cCI6MTc0NjI1MTcxOCwiaWF0IjoxNzQ1NjQ2OTE4LCJpc3MiOiJJU1MifQ.CUKzA4unbOtqQwMz2E1zdMjNlb1QAGyzOAY4wtO57sU';
export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value ?? v;
  } else {
    const { default: JsCookie } = await import('js-cookie');
    return JsCookie.get('accessToken') || v;
  }
};
