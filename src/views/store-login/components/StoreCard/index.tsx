import { ChevronRightIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface Props {
  className?: string;
  name: string;
  domain: string;
  status: string;
  href?: string;
}

export default function StoreCard({
  className,
  name,
  domain,
  status,
  href,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      className={classNames(
        'flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700',
        className
      )}
      rel="noreferrer"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
        <HomeModernIcon className="h-5 w-5 text-slate-300" />
      </div>
      <div className="flex flex-col gap-1">
        <h3>{name}</h3>
        <p className=" text-[12px] text-slate-400">{domain}</p>
        <p className="w-fit rounded-xl bg-slate-200 px-2 text-[12px]">
          {status}
        </p>
      </div>
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </a>
  );
}
