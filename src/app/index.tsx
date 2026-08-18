import { StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Index() {


  if (true) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Loading...thi sis a test</ThemedText>
        {/* <ActivityIndicator size="large" color={Colors[scheme].tint} /> */}
        {/* <ActivityIndicator size="large" color={"#E63946"} /> */}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
