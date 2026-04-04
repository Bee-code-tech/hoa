import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authUtils = {
  setAuth(token: string, user: any) {
    // Set cookie to expire in 7 days as requested
    Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: "strict" });
    Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, secure: true, sameSite: "strict" });
    
    // Also store in localStorage for components that might prefer it (though Cookies are more reliable for Middleware)
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getAuth() {
    const token = Cookies.get(TOKEN_KEY);
    const userStr = Cookies.get(USER_KEY);
    
    return {
      token,
      user: userStr ? JSON.parse(userStr) : null,
    };
  },

  removeAuth() {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
    
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  isAuthenticated() {
    return !!Cookies.get(TOKEN_KEY);
  },

  getUserRole() {
    const userStr = Cookies.get(USER_KEY);
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.role;
    } catch {
      return null;
    }
  }
};
