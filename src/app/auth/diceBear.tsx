import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useRouter } from "expo-router";
import { ArrowRight, RefreshCw } from "lucide-react-native";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

function generateAvatar(seed: string) {
  return createAvatar(adventurer, {
    seed,
    hairProbability: 100,
  }).toString();
}

export default function AvatarScreen() {
  const router = useRouter();

  const [seed, setSeed] = useState("secret-city-starter");
  const [avatarSvg, setAvatarSvg] = useState<string>(() =>
    generateAvatar(seed),
  );

  const handleRandomize = () => {
    const randomSeed = Math.random().toString(36).substring(2);
    setSeed(randomSeed);
    setAvatarSvg(generateAvatar(randomSeed));
  };

  const handleContinue = () => {
    // TODO: persist seed to AsyncStorage / global state here
    router.push("../auth/name");
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.stepLabel}>Step 1 of 2</Text>
        <Text style={styles.title}>Make It You</Text>
        <Text style={styles.subtitle}>
          Roll the dice to generate your custom explorer avatar.
        </Text>
      </View>

      {/* Avatar Preview Card */}
      <View style={styles.previewCard}>
        <View style={styles.avatarRing}>
          <SvgXml xml={avatarSvg} width={160} height={160} />
        </View>

        <Pressable
          onPress={handleRandomize}
          style={({ pressed }) => [
            styles.randomizeBtn,
            pressed && styles.pressed,
          ]}
        >
          <RefreshCw size={18} color="#F2B01E" />
          <Text style={styles.randomizeLabel}>Randomize Avatar</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }} />

      {/* Continue Button */}
      <Pressable
        onPress={handleContinue}
        style={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
      >
        <Text style={styles.continueLabel}>Continue to Secret City</Text>
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
    justifyContent: "space-between",
  },
  header: { alignItems: "center", marginTop: 16, marginBottom: 24 },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F2B01E",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F2B01E",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#B8B8B0",
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 16,
  },
  previewCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E2E2E",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatarRing: {
    backgroundColor: "#1C1C1C",
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "#F2B01E",
    padding: 16,
  },
  randomizeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(242,176,30,0.12)",
    borderWidth: 1,
    borderColor: "rgba(242,176,30,0.4)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    marginTop: 32,
  },
  randomizeLabel: {
    color: "#F2B01E",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2B01E",
    paddingVertical: 16,
    borderRadius: 16,
  },
  continueLabel: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 8,
  },
  pressed: { opacity: 0.8 },
});
