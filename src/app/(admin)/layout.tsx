'use client';

import React from 'react';

import { useSidebar } from '@/app/context/SidebarContext';
import AppHeader from '@/app/layout/AppHeader';
import AppSidebar from '@/app/layout/AppSidebar';
import Backdrop from '@/app/layout/Backdrop';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px]'
    : 'lg:ml-[90px]';

  return (
    <div className='min-h-screen xl:flex'>
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className='p-4 mx-auto max-w-screen-2xl md:p-6'>{children}</div>
      </div>
    </div>
  );
}
