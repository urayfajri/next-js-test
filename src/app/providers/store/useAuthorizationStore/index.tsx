import { produce } from 'immer';
import toast from 'react-hot-toast';
import { create } from 'zustand';

import { DEFAULT_TOAST_MESSAGE } from '@/app/constants/toast';
import axiosClient from '@/app/services/axios';
import { User } from '@/app/types/model/user/type';

type AuthorizationStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
  startLoading: () => void;
};

const useAuthorizationStore = create<AuthorizationStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user: User) => {
    set(
      produce<AuthorizationStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      })
    );
  },
  logout: () => {
    const logoutHandler = async () => {
      try {
        await axiosClient.post(`/signout`);
      } finally {
        localStorage.removeItem('token');
        set(
          produce<AuthorizationStoreType>((state) => {
            state.isAuthenticated = false;
            state.user = null;
          })
        );
      }
    };

    toast.promise(logoutHandler(), {
      ...DEFAULT_TOAST_MESSAGE,
      success: 'Logout Success',
      error: 'Logout Error',
    });
  },
  startLoading: () => {
    set(
      produce<AuthorizationStoreType>((state) => {
        state.isLoading = true;
      })
    );
  },
  stopLoading: () => {
    set(
      produce<AuthorizationStoreType>((state) => {
        state.isLoading = false;
      })
    );
  },
  setIsAuthenticated(isAuthenticated: boolean) {
    set(
      produce<AuthorizationStoreType>((state) => {
        state.isAuthenticated = isAuthenticated;
      })
    );
  },
}));

export default useAuthorizationStore;
