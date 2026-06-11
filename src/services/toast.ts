import ToastLibrary, { ToastOptions } from "react-native-root-toast";

export const TOAST_POSITIONS = {
  TOP: 75,
  BOTTOM: -90,
  CENTER: 0,
};

export const TOAST_DURATIONS = {
  DEFAULT: 7500,
  LONG: 10000,
  MEDIUM: 5000,
  SHORT: 3000,
};

const DEFAULT_OPTIONS: ToastOptions = {
  duration: TOAST_DURATIONS.MEDIUM,
  position: TOAST_POSITIONS.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  keyboardAvoiding: true,
  opacity: 1,
  containerStyle: {
    borderRadius: 10,
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textStyle: {
    color: "#FFFFFF",
    fontFamily: "Inter-Regular",
    fontSize: 13,
  },
};

export function showToast(message: string, options?: ToastOptions) {
  return ToastLibrary.show(message, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
}