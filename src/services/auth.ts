import { api, setToken } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type GoogleLoginInput = {
  email: string;
  name: string;
  image?: string;
  googleId: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  return api<AuthResponse>("/auth/login", { method: "POST", body: { email, password } });
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  return api<AuthResponse>("/auth/register", { method: "POST", body: { name, email, password } });
}

export async function googleLogin(
  input: GoogleLoginInput,
): Promise<AuthResponse> {
  return api<AuthResponse>("/auth/google", { method: "POST", body: input });
}

export function completeAuth(response: AuthResponse): void {
  setToken(response.token);
  localStorage.setItem("nomadia_logged_in", "true");
  localStorage.setItem("nomadia_user_email", response.user.email);
  localStorage.setItem("nomadia_user_name", response.user.name);
}