import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

import { User } from "@/interfaces/user";
import { delay } from "@/utils/delay";

const MOCK_EMAIL = "teste@kinebot.com.br";
const MOCK_PASSWORD = "123456";
const MOCK_REQUEST_DELAY = 1000;
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
}

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  user: null,
  accessToken: null,
  isSigned: false,

  authenticate: async function authenticate({ email, password, rememberMe }) {
    await delay(MOCK_REQUEST_DELAY);

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
}));
