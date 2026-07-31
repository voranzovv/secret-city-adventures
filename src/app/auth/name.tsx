import { useRouter } from "expo-router";
import { ArrowRight, Shuffle } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const RANDOM_NAMES = ["Wren Dusk", "Ash Marlow", "Sable Fox", "Rowan Vale"];

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleRandom = () => {
    setName(RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]);
  };

  const handleFinish = () => {
    // compute a display name and persist later
    // TODO: persist name.trim() || RANDOM_NAMES[0] to AsyncStorage / global state here
    router.push("/app/explore");
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Progress dots */}
      <View style={styles.progressRow}>
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={[styles.progressBar, styles.progressActive]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Who is Investigating?</Text>
        <Text style={styles.subtitle}>Pick the name your group will see.</Text>
        <Text style={styles.subtitle}>You can change it any time.</Text>
      </View>

      {/* Avatar preview */}
      <View style={styles.previewWrap}>
        <View style={styles.avatarCircle} />
      </View>

      {/* Name input */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Explorer name"
        placeholderTextColor="#7A7A75"
        style={styles.input}
      />

      <View style={{ flex: 1 }} />

      {/* Random button */}
      <Pressable
        onPress={handleRandom}
        style={({ pressed }) => [styles.randomBtn, pressed && styles.pressed]}
      >
        <Shuffle size={18} color="#000000" />
        <Text style={styles.randomLabel}>Random</Text>
      </Pressable>

      {/* Finish button */}
      <Pressable
        onPress={handleFinish}
        style={({ pressed }) => [styles.finishBtn, pressed && styles.pressed]}
      >
        <Text style={styles.finishLabel}>Finish! View Profile</Text>
        <ArrowRight size={20} color="#000000" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#232323",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  progressRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#3A3A3A",
  },
  progressActive: { backgroundColor: "#F2B01E" },
  header: { marginBottom: 24 },
  title: { fontSize: 22, fontWeight: "700", color: "#F2B01E" },
  subtitle: { fontSize: 14, color: "#B8B8B0", marginTop: 4 },
  previewWrap: { alignItems: "center", marginBottom: 32 },
  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#7A7A75",
  },
  input: {
    backgroundColor: "#3A3A3A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#F5F5F0",
    fontSize: 15,
    textAlign: "center",
  },
  randomBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2B01E",
    paddingVertical: 16,
    borderRadius: 999,
    marginBottom: 8,
  },
  randomLabel: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
  },
  finishBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2B01E",
    paddingVertical: 16,
    borderRadius: 999,
  },
  finishLabel: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 15,
    marginRight: 8,
  },
  pressed: { opacity: 0.8 },
});
