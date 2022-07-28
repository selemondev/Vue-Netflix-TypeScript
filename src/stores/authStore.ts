import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "../supabaseConfig";
import type { AuthTypes } from "../Types/authDataTypes";
export const useAuthStore = defineStore({
  id: "auth",
  state:() => ({
    userData: JSON.parse(localStorage.getItem("user") as string) as AuthTypes[] | any,
    registerErrorMsg: "" as string | undefined,
    registerLoading: false,
    loginErrorMsg: "" as string | undefined,
    loginLoading: false,
    logOutLoading: false,
    logOutErrorMsg: "" as string | undefined,
  }),

  getters: {
  },

  actions: {
    async registerUser(email:string, password:string) {
      this.registerLoading = true;
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password
        });
        const auth = supabase.auth.user();
        this.userData = auth;
        this.registerLoading = false;
        localStorage.setItem("user", JSON.stringify(auth));
        this.registerErrorMsg = error?.message;
    },

    async loginUser(email:string, password:string) {
      this.loginLoading = true;
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password
      });

      const auth = supabase.auth.user();
      this.userData = auth;
      this.loginLoading = false;
      localStorage.setItem("user", JSON.stringify(auth));
      this.loginErrorMsg = error?.message;
    },

    async logOut() {
      this.logOutLoading = true;
      const { error } = await supabase.auth.signOut();
      this.userData = null;
      this.logOutLoading = false;
      localStorage.removeItem("user");
      this.logOutErrorMsg = error?.message;
    }
  }
});

if( import.meta.hot ) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}