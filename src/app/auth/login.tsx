import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ScreenContainer from "../../components/ui/ScreenContainer";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScreenContainer style={styles.center}>
      <Text style={styles.title}>Secret City Adventures</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/diceBear")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#E63946",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
