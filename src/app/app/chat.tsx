import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const HAS_ACTIVE_GROUP = false;

const INITIAL_MESSAGES = [
  {
    id: "1",
    sender: "Theo R",
    text: "Perfect! What theme did we end up booking again?",
    self: false,
  },
  { id: "2", sender: "Maya S", text: "The Haunted labs.", self: false },
  { id: "3", sender: "You", text: "Excited to meet you guys !", self: true },
];

function EmptyChat() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.emptyWrap}>
        <View style={styles.divider} />
        <Text style={styles.emptyTitle}>NO ACTIVE GROUP</Text>
        <Text style={styles.emptySubtitle}>
          Join a group to unlock the chat and start{"\n"}planning your mystery.
        </Text>
        <View style={styles.divider} />
        <Pressable
          // onPress={() => router.push("/app/join")}
          style={({ pressed }) => [
            styles.findGroupBtn,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.findGroupLabel}>Find a Group</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  if (!HAS_ACTIVE_GROUP) return <EmptyChat />;

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "You", text: draft, self: true },
    ]);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerThumb} />
        <Text style={styles.countdown}>34hr 14min</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.self && styles.bubbleRowSelf]}>
            <View style={[styles.bubble, item.self && styles.bubbleSelf]}>
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Share your idea"
          placeholderTextColor="#7A7A75"
          style={styles.input}
        />
        <Pressable onPress={send} style={styles.sendBtn}>
          <Text style={{ fontSize: 16 }}>➤</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#232323" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4A",
  },
  headerThumb: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "#3A3A3A",
  },
  countdown: { color: "#F2B01E", fontWeight: "700", fontSize: 15 },
  bubbleRow: { marginBottom: 8, alignItems: "flex-start" },
  bubbleRowSelf: { alignItems: "flex-end" },
  bubble: {
    backgroundColor: "#2E2E2E",
    borderRadius: 14,
    padding: 8,
    maxWidth: "80%",
  },
  bubbleSelf: { backgroundColor: "#3A3A3A" },
  bubbleText: { color: "#F5F5F0", fontSize: 15 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#4A4A4A",
  },
  input: {
    flex: 1,
    backgroundColor: "#3A3A3A",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#F5F5F0",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F2B01E",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#4A4A4A",
    width: "100%",
    marginVertical: 24,
  },
  emptyTitle: {
    color: "#F2B01E",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    color: "#B8B8B0",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  findGroupBtn: {
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: "#F2B01E",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  findGroupLabel: { color: "#F2B01E", fontWeight: "700", fontSize: 14 },
  pressed: { opacity: 0.8 },
});
