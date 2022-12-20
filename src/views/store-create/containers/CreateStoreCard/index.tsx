import classNames from 'classnames';

import classes from '../../styles/index.module.scss';

interface Props {
  className?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function CreateStoreCard({
  className,
  title,
  description,
  children,
}: Props) {
  return (
    <div
      className={classNames(
        'block rounded-lg border border-gray-200 bg-white px-12 pt-16 pb-11 shadow-2xl',
        className,
        classes.fadeIn
      )}
    >
      <div className="mb-4 flex h-12 w-44 items-center justify-center bg-slate-600">
        <h1 className="leading-8 text-white">TokenBricks Logo</h1>
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="font-normal text-gray-700">{description}</p>
      {children}
    </div>
  );
}
