import { decodeToken, isExpired } from "react-jwt";
// utils
import apiService from "../../utils/apiService";
import { clearObject, setObject, getObject } from "../../utils/localStorage";

// interface
interface registerWithEmailAndPassword {
  name: string;
  email: string;
  password: string;
}

interface loginWithEmailAndPassword {
  email: string;
  password: string;
}

interface forgotPassword {
  email: string;
}

interface resetPassword {
  password: string;
  token: string;
}

// methods
class AuthApi {
  async registerWithEmailAndPassword({
    name,
    email,
    password,
  }: registerWithEmailAndPassword) {
    try {
      const res = await apiService.post(`/v1/auth/register`, {
        name,
        email,
        password,
      });
      setObject("token", JSON.stringify(res.data.tokens.access.token));
      return apiService.response(true, res.data.user, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async loginWithEmailAndPassword({
    email,
    password,
  }: loginWithEmailAndPassword) {
    try {
      const res = await apiService.post(`/v1/auth/login`, {
        email,
        password,
      });
      setObject("token", JSON.stringify(res.data.tokens.access.token));
      return apiService.response(true, res.data.user, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async authenticateToken() {
    try {
      const token = await getObject("token");
      if (!token) return apiService.response(false, {}, "No token found");
      const isTokenExpired = isExpired(token);
      if (isTokenExpired) {
        clearObject("token");
        return apiService.response(false, {}, "Invalid Token");
      }
      const decodedToken: { sub: string } | null = decodeToken(token);
      const res = await apiService.get(`/v1/users/${decodedToken?.sub}`);
      return apiService.response(true, res.data, "");
    } catch (err: any) {
      clearObject("token");
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async forgotPassword({ email }: forgotPassword) {
    try {
      await apiService.post(`/v1/auth/forgot-password`, {
        email,
      });
      return apiService.response(true, "Password reset link sent", "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async resetPassword({ password, token }: resetPassword) {
    try {
      await apiService.post(`/v1/auth/reset-password?token=${token}`, {
        password,
      });
      return apiService.response(true, "Password reset successfully", "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  logout() {
    clearObject("token");
  }
}

const authApi = new AuthApi();
export default authApi;
