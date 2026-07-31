import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import { SvgXml } from "react-native-svg";

import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function AvatarCreator() {
  const [avatar, setAvatar] = useState<string>("");

  const generateAvatar = () => {
    // Creates a new avatar identity
    const seed = Math.random().toString(36).substring(2);

    const options = {
      beardProbability: 85,
      beardVariant: [],
      earringsProbability: 86,
      eyebrowsProbability: 100,
      eyesProbability: 100,
      eyesVariant: [],
      hairProbability: 100,
      seed: Math.random().toString(36).substring(2),
    };

    const svg = createAvatar(adventurer, options).toString();

    setAvatar(svg);
  };

  return (
    <View style={styles.container}>
      {avatar !== "" && <SvgXml xml={avatar} width={220} height={220} />}

      <Button title="Generate Avatar" onPress={generateAvatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    gap: 30,
  },
});
