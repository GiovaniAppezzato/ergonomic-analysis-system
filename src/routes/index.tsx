import { PublicRoutes } from "@/routes/public.routes";
import { SplashScreen } from "@/screens/public/splash";
import { useApplicationStore } from "@/stores/application";

export function Routes() {
  const isLoadingApp = useApplicationStore((state) => state.isLoadingApp);
  const isSigned = false;

  if (isLoadingApp) {
    return <SplashScreen />;
  }

  return isSigned ? null : <PublicRoutes />;
}
