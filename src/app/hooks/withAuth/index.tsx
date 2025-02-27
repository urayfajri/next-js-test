import { useRouter } from 'next/navigation';
import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

import useAuthorizationStore from '@/app/providers/store/useAuthorizationStore';
import axiosClient from '@/app/services/axios';
import { ApiReturn } from '@/app/types/common/type';
import { User } from '@/app/types/model/user/type';

export interface WithAuthProps {
  user: User;
}

export type RoutePageType = 'auth' | 'nonauth';

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routePageType: RoutePageType = 'nonauth'
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();

    //#region  //*=========== STORE ===========
    const {
      isAuthenticated,
      isLoading,
      login,
      stopLoading,
      user,
      logout,
      startLoading,
    } = useAuthorizationStore();

    //#endregion  //*======== STORE ===========

    React.useEffect(() => {
      const loadUser = async () => {
        try {
          startLoading();
          const token = localStorage.getItem('token');
          if (!token) {
            return;
          }

          const res = await axiosClient.get<ApiReturn<User>>('/profile');

          const user: User | null = {
            ...res.data.data,
          };

          login({
            ...user,
          });
        } catch (err) {
          logout();
        } finally {
          stopLoading();
        }
      };
      loadUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (routePageType === 'auth') {
            router.replace('/');
          }
        }
        // Prevent unauthenticated user from accessing protected pages
        // else {
        //   if (routePageType !== 'auth') {
        //     router.replace('/signin');
        //   }
        // }
      }
    }, [isAuthenticated, isLoading, router, user]);

    if (
      // If authenticated user want to access auth or other role pages
      ((isLoading || isAuthenticated) && routePageType === 'auth') ||
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routePageType !== 'auth')
    ) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
          <ImSpinner8 className='mb-4 animate-spin text-4xl' />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
