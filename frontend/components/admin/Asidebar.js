'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

function Asidebar() {
  const router = useRouter();

  const asidemenu = [
    {
      title: 'Home',
      url: '/admin/dashboard',
    },
    {
      title: 'Add Article',
      url: '/admin/post',
    },
    {
      title:'Notification',
      url:'/admin/notification',
    }
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <aside className="h-[80vh] w-40 rounded-xl mb-2 sticky top-9 bg-slate-100 px-3 py-1">
      {asidemenu.map((item, index) => (
        <Link href={item.url} key={index}>
          <button className="w-full rounded-xl cursor-pointer bg-amber-200 py-1 text-xl mb-1">
            {item.title}
          </button>
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="w-full rounded-xl cursor-pointer bg-red-400 py-1 text-xl mt-4"
      >
        Logout
      </button>
    </aside>
  );
}

export default Asidebar;
