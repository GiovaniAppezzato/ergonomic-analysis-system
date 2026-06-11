import { PrivateRoutes } from "@/routes/private.routes";
import { PublicRoutes } from "@/routes/public.routes";
import { SplashScreen } from "@/screens/public/splash";
import { useApplicationStore } from "@/stores/application";
import { useAuthenticationStore } from "@/stores/authentication";

export function Routes() {
  const { isLoadingApp } = useApplicationStore();
  const { isSigned } = useAuthenticationStore();

  if (isLoadingApp) {
    return <SplashScreen />;
  }

  return isSigned ? <PrivateRoutes /> : <PublicRoutes />;
}
