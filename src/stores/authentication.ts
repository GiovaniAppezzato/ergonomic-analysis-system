import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

import { User } from "@/interfaces/user";
import { delay } from "@/utils/delay";

const MOCK_EMAIL = "teste@kinebot.com.br";
const MOCK_PASSWORD = "123456";
const AUTH_TOKEN_STORAGE_KEY = "@kinebot:access-token";

interface AuthenticateInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthenticationState {
  user: User | null;
  accessToken: string | null;
  isSigned: boolean;
  authenticate: (input: AuthenticateInput) => Promise<boolean>;
  restoreAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  user: null,
  accessToken: null,
  isSigned: false,

  authenticate: async function authenticate({ email, password, rememberMe }) {
    await delay(1000);

    const credentialsAreValid =
      email === MOCK_EMAIL && password === MOCK_PASSWORD;

    if (!credentialsAreValid) {
      return false;
    }

    const accessToken = Crypto.randomUUID();

    const user: User = {
      name: "Usuário Kinebot",
      email: email,
    };

    if (rememberMe) {
      await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, accessToken);
    }

    set({ user, accessToken, isSigned: true });

    return true;
  },

  restoreAuthentication: async function restoreAuthentication() {
    const accessToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (!accessToken) {
      return;
    }

    set({
      user: {
        name: "Usuário Kinebot",
        email: MOCK_EMAIL,
      },
      accessToken,
      isSigned: true,
    });
  },

  logout: async function logout() {
    await delay(1000);

    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

    set({
      user: null,
      accessToken: null,
      isSigned: false,
    });
  },
}));
