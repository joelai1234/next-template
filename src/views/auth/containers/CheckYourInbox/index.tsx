import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import type { SniperLinksAo } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useEffect, useState } from 'react';

import { isMobile } from '@/utils/isMobile';

interface Props {
  email?: string;
  sniperLinks?: SniperLinksAo;
  onResendEmail?: () => void;
}

export default function CheckYourInbox({
  email,
  sniperLinks,
  onResendEmail,
}: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (time !== 0) {
      timer = setTimeout(() => {
        setTime((_time) => _time - 1);
      }, 1_000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(() => {
    if (sniperLinks) setTime(60);
  }, [sniperLinks]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-4 ">
      <img
        className="h-20 w-20"
        src="/assets/images/common/inbox.png"
        alt="inbox"
      />
      <h1 className="mt-4 text-4xl font-bold">Check your inbox</h1>
      {email && <p className="mt-1">{email}</p>}
      <p className="mt-4 max-w-xl text-center text-xl text-slate-500">
        We sent you an activation link. Please be sure to check your spam folder
        too.
      </p>
      {onResendEmail && (
        <button
          disabled={time !== 0}
          type="button"
          className="mt-8 inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-20 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
          onClick={() => {
            setTime(60);
            onResendEmail();
          }}
        >
          Resend email {time !== 0 && `(${time})`}
        </button>
      )}
      {sniperLinks && (
        <>
          <button
            type="button"
            className=" mt-10 inline-flex w-72 items-center justify-between gap-4 rounded bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              if (isMobile()) {
                window.open(sniperLinks?.mobile.gmail);
              } else {
                window.open(sniperLinks?.desktop.gmail);
              }
            }}
          >
            <img
              className="h-7 w-7"
              src="/assets/images/common/email.png"
              alt="email"
            />
            <span className="text-xl text-slate-700">Open Gmail</span>
            <ArrowTopRightOnSquareIcon
              className="-mr-1 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="mt-4 inline-flex w-72 items-center justify-between gap-4 rounded bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              if (isMobile()) {
                window.open(sniperLinks?.mobile.outlook);
              } else {
                window.open(sniperLinks?.desktop.outlook);
              }
            }}
          >
            <img
              className="h-7 w-7"
              src="/assets/images/common/outlook.png"
              alt="email"
            />
            <span className="text-xl text-slate-700">Open Outlook</span>
            <ArrowTopRightOnSquareIcon
              className="-mr-1 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="mt-4 inline-flex w-72 items-center justify-between gap-4 rounded bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              if (isMobile()) {
                window.open(sniperLinks?.mobile.yahoo);
              } else {
                window.open(sniperLinks?.desktop.yahoo);
              }
            }}
          >
            <img
              className="h-7 w-7"
              src="/assets/images/common/yahoo.png"
              alt="email"
            />
            <span className="text-xl text-slate-700">Open Yahoo</span>
            <ArrowTopRightOnSquareIcon
              className="-mr-1 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="mt-4 inline-flex w-72 items-center justify-between gap-4 rounded bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              if (isMobile()) {
                window.open(sniperLinks?.mobile.protonmail);
              } else {
                window.open(sniperLinks?.desktop.protonmail);
              }
            }}
          >
            <img
              className="h-7 w-7"
              src="/assets/images/common/proton.png"
              alt="email"
            />
            <span className="text-xl text-slate-700">Open ProtonMail</span>
            <ArrowTopRightOnSquareIcon
              className="-mr-1 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="mt-4 inline-flex w-72 items-center justify-between gap-4 rounded bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              if (isMobile()) {
                window.open(sniperLinks?.mobile.icloud);
              } else {
                window.open(sniperLinks?.desktop.icloud);
              }
            }}
          >
            <img
              className="h-7 w-7"
              src="/assets/images/common/icloud.png"
              alt="email"
            />
            <span className="text-xl text-slate-700">Open Icloud</span>

            <ArrowTopRightOnSquareIcon
              className="-mr-1 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </>
      )}
    </div>
  );
}
