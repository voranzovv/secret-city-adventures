import { Redirect, Stack } from "expo-router";

function RootNavigator() {
  return <Redirect href="/app/explore copy" />;
}

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}></Stack>
      <RootNavigator />
    </>
  );
}
