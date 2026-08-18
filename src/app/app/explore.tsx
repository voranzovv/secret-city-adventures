import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function explore() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore Nearby</Text>
      </View>
      <Text>Explore Nearby</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    color: "#F2B01E",
    fontSize: 14,
    marginBottom: 39,
    fontFamily: "Crimson Text",
    fontWeight: "600",
    letterSpacing: 0,
  },
});

// font-family: Crimson Text;
// font-weight: 600;
// font-style: SemiBold;
// font-size: 14px;
// leading-trim: NONE;
// line-height: 100%;
// letter-spacing: 0%;
