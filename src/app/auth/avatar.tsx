import { BigHead } from "@bigheads/core";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

// bigheads library options — swap in more of its supported values anytime
const FACE_SHAPES = ["chest", "breasts"] as const;
const HAIR_STYLES = [
  "none",
  "short",
  "long",
  "bun",
  "pixie",
  "balding",
  "buzz",
  "afro",
  "bob",
] as const;
const HAIR_COLORS = ["black", "brown", "blonde"] as const; // maps to BigHead `hairColor`

type FaceShape = (typeof FACE_SHAPES)[number];
type HairStyle = (typeof HAIR_STYLES)[number];
type HairColor = (typeof HAIR_COLORS)[number];

export default function AvatarScreen() {
  const router = useRouter();
  const scheme: "light" | "dark" =
    useColorScheme() === "light" ? "light" : "dark";
  const colors = Colors[scheme];
  const { setAvatar } = useAuth();

  const [faceShape, setFaceShape] = useState<FaceShape>(FACE_SHAPES[0]);
  const [hairStyle, setHairStyle] = useState<HairStyle>(HAIR_STYLES[0]);
  const [hairColor, setHairColor] = useState<HairColor>(HAIR_COLORS[0]);

  const avatarId = useMemo(
    () => `${faceShape}-${hairStyle}-${hairColor}`,
    [faceShape, hairStyle, hairColor],
  );

  const handleRandom = () => {
    setFaceShape(FACE_SHAPES[Math.floor(Math.random() * FACE_SHAPES.length)]);
    setHairStyle(HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)]);
    setHairColor(HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)]);
  };

  const handleNext = async () => {
    await setAvatar(avatarId);
    router.push("/auth/name");
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.safeArea}>
        {/* Progress bar */}
        <View style={styles.progressRow}>
          <View
            style={[
              styles.progressBar,
              styles.progressActive,
              { backgroundColor: colors.tint },
            ]}
          />
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.backgroundElement },
            ]}
          />
        </View>

        <ThemedText type="title" style={{ color: colors.tint }}>
          Make It You
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: colors.textSecondary, marginBottom: Spacing.four }}
        >
          Everything updates live. Or skip the fuss entirely.
        </ThemedText>

        {/* Avatar preview */}
        <View style={styles.previewWrap}>
          <View style={[styles.previewCircle, { borderColor: colors.tint }]}>
            <BigHead
              body={faceShape}
              hair={hairStyle}
              hairColor={hairColor}
              accessory="none"
              hat="none"
              clothing="shirt"
              clothingColor="blue"
              eyebrows="raised"
              eyes="normal"
              mouth="grin"
              faceMask={false}
              lashes={false}
              mask={false}
            />
          </View>
        </View>

        <OptionRow
          label="Face Shape"
          options={FACE_SHAPES}
          selected={faceShape}
          onSelect={setFaceShape}
          colors={colors}
        />
        <OptionRow
          label="Hair Style"
          options={HAIR_STYLES}
          selected={hairStyle}
          onSelect={setHairStyle}
          colors={colors}
        />
        <OptionRow
          label="Hair Color"
          options={HAIR_COLORS}
          selected={hairColor}
          onSelect={setHairColor}
          colors={colors}
        />

        <View style={styles.footer}>
          <Pressable
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleRandom}
          >
            <ThemedText style={styles.buttonText}>Random</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleNext}
          >
            <ThemedText style={styles.buttonText}>Next</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function OptionRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
  colors,
}: {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (v: T) => void;
  colors: typeof Colors.light;
}) {
  return (
    <View style={styles.section}>
      <ThemedText
        type="small"
        style={{ fontStyle: "italic", marginBottom: Spacing.two }}
      >
        {label}
      </ThemedText>
      <View style={styles.optionsRow}>
        {options.map((opt) => (
          <Pressable
            key={opt}
            onPress={() => onSelect(opt)}
            style={[
              styles.optionBox,
              {
                borderColor: colors.tint,
                backgroundColor:
                  selected === opt ? colors.backgroundSelected : "transparent",
              },
            ]}
          >
            <ThemedText type="small" style={{ textAlign: "center" }}>
              {opt}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  progressRow: {
    flexDirection: "row",
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressActive: {
    flex: 1,
  },
  previewWrap: {
    alignItems: "center",
    marginVertical: Spacing.five,
  },
  previewCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: Spacing.four,
  },
  optionsRow: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
  optionBox: {
    minWidth: 72,
    height: 56,
    borderRadius: Spacing.two,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.two,
  },
  footer: {
    marginTop: "auto",
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  button: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.four,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
