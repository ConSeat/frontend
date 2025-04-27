export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value ?? '';
  } else {
    const { default: JsCookie } = await import('js-cookie');
    return JsCookie.get('accessToken') || '';
  }
};

export const setAccessToken = async (accessToken: string) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  } else {
    const { default: JsCookie } = await import('js-cookie');
    JsCookie.set('accessToken', accessToken);
  }
};
