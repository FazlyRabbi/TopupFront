import { create } from "zustand";
import axios from "axios";
import { getSession } from "next-auth/react";

const useStore = create((set) => ({
  isLogin: false,
  category: null,
  recentOrder: null,
  token: null,
  userInfo: null,
  error: null,
  loading: false,
  paymentInfo: null,
  setData: (data) => set({ data }),

  setPaymentInfo: (info) => {
    set({ paymentInfo: info });
  },
  setToken: (token) => {
    set({ token: token });
  },

  fetchUserInfo: async (phone) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.patch(`${process.env.API_URL}/api/user`, {
        phone,
      });

      set({ userInfo: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchRecentOrder: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${process.env.API_URL}/api/order`);
      set({ recentOrder: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUserData: async () => {
    set({ loading: true, error: null });

    try {
      // Fetch session to get user data
      const session = await getSession();

      if (!session) {
        set({ loading: false });
        return;
      }

      // Make an HTTP request to fetch user data using session data
      const response = await axios.get(`${process.env.API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      set({ userInfo: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  hanleIslogin: () => {
    set({ isLogin: true });
  },
}));

export default useStore;
