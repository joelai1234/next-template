import { Popover, Transition } from '@headlessui/react';
import {
  ArrowRightCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { useAuth } from '@/services/auth';

export default function UserButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/sign-in');
  };

  return (
    <div>
      <Popover className="relative">
        <Popover.Button className="flex items-center focus:outline-none">
          <UserCircleIcon className="h-8 w-8 cursor-pointer fill-slate-500" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 w-60">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex gap-2 border-b border-slate-300 p-4">
                <div>
                  <UserCircleIcon className="h-10 w-10 fill-slate-500" />
                </div>
                <div className="text-[12px]">
                  <h4 className="font-bold">{session?.user.me.name}</h4>
                  <p className=" break-all text-slate-400">
                    {session?.user.me.email}
                  </p>
                </div>
              </div>
              <div>
                <div className="cursor-pointer p-2">
                  <div
                    className="flex items-center gap-4 px-4 py-2 hover:bg-slate-100"
                    onClick={handleLogout}
                  >
                    <ArrowRightCircleIcon className="h-5 w-5" />
                    <span className=" text-sm">Log out</span>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
