import Link from 'next/link';

const Hall = (props) => {
  return (
    <div>
      {props.params.hall}
      <ul>
        <li>
          <Link
            href={`/home/${props.params.hall}/single`}
          >{`/home/${props.params.hall}/single`}</Link>
        </li>
        <li>
          <Link
            href={`/home/${props.params.hall}/compare`}
          >{`/home/${props.params.hall}/compare`}</Link>
        </li>
        <li>
          <Link
            href={`/home/${props.params.hall}/review`}
          >{`/home/${props.params.hall}/review`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Hall;
