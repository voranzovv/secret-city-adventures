import { Redirect, Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

function RootNavigator() {
  // const { user, isLoading, hasCompletedOnboarding } = useAuth();

  // if (isLoading) return null; // or a splash/loading screen

  // if (!user) return <Redirect href="/auth/login" />;
  // if (!hasCompletedOnboarding) return <Redirect href="/auth/avatar" />;

  return <Redirect href="/auth/login" />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="app" />
      </Stack>
      <RootNavigator />
    </AuthProvider>
  );
}
