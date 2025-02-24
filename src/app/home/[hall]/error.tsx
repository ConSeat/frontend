'use client';

const HomeError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  console.error(error.message);
  return (
    <html>
      <body>
        <h2>Something went wrong! in Hall</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default HomeError;
