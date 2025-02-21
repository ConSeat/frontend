import Link from 'next/link';

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/home">home</Link>
        </li>
        <li>
          <Link href="/mypage">mypage</Link>
        </li>
        <li>
          <Link href="/signin">signin</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
