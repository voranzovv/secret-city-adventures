import { StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user, isLoading, hasCompletedOnboarding } = useAuth();
  const scheme = useColorScheme() ?? "dark";

  if (true) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Loading...thi sis a test</ThemedText>
        {/* <ActivityIndicator size="large" color={Colors[scheme].tint} /> */}
        {/* <ActivityIndicator size="large" color={"#E63946"} /> */}
      </ThemedView>
    );
  }

  // if (!user) return <Redirect href="/auth/login" />;
  // if (!user) return <Redirect href="/auth/TestPage" />;
  // if (!hasCompletedOnboarding) return <Redirect href="/auth/avatar" />;

  // return <Redirect href="/app/explore" />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
