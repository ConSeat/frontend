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
  const EXPIRES_IN_DAYS = 1; // 하루

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
    });
  } else {
    const { default: JsCookie } = await import('js-cookie');
    JsCookie.set('accessToken', accessToken, {
      expires: EXPIRES_IN_DAYS,
    });
  }
};

export const redirectToSignin = async () => {
  if (typeof window === 'undefined') {
    const { redirect } = await import('next/navigation');
    redirect('/signin');
  } else {
    window.location.href = '/signin';
  }
};
