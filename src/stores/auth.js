import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
  }),
  actions: {
    async login(id, password, deviceToken) {
      try {
        const res = await axios.post(
          "/api/Account/login",
          {
            id,
            password,
            deviceToken
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        return res.data;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
  },
});
