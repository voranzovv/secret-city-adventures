import { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// TODO: replace with real profile data from global state
const PROFILE = {
  name: "Wren Dusk",
  level: 7,
  xp: 840,
  xpToNextLevel: 1000,
  clueChest: 1,
};

export default function ProfileScreen() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const progress = PROFILE.xp / PROFILE.xpToNextLevel;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{PROFILE.name}</Text>
            <View style={styles.levelPill}>
              <Text style={styles.levelText}>Level {PROFILE.level}</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.caption}>
            {PROFILE.xp} / {PROFILE.xpToNextLevel} XP to Level{" "}
            {PROFILE.level + 1}
          </Text>
        </View>

        <View style={styles.bioRow}>
          <View style={styles.avatarCircle} />
          <View style={styles.bioBubble}>
            <Text style={styles.bioText}>
              Beginner puzzle solver, professional clue finder. Ready to search
              every corner and help the team win.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.caption}>Clue Chest</Text>
            <Text style={styles.statValue}>{PROFILE.clueChest}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.caption}>Weekly Spin</Text>
            <Text style={styles.statSub}>IN 35H 45M</Text>
          </View>
        </View>

        <Pressable style={styles.inviteBtn}>
          <Text style={styles.inviteLabel}>Invite Friends</Text>
        </Pressable>

        <View style={styles.tabRow}>
          <Pressable onPress={() => setTab("upcoming")}>
            <Text
              style={[
                styles.tabLabel,
                tab === "upcoming" && styles.tabLabelActive,
              ]}
            >
              Upcoming Events
            </Text>
          </Pressable>
          <Pressable onPress={() => setTab("past")}>
            <Text
              style={[styles.tabLabel, tab === "past" && styles.tabLabelActive]}
            >
              Past Events
            </Text>
          </Pressable>
        </View>

        {tab === "upcoming" ? (
          <View style={styles.eventCard}>
            <View style={styles.eventThumb} />
            <View>
              <Text style={styles.eventTitle}>Where Dark Things Dwell</Text>
              <Text style={styles.caption}>In 2 days</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.bioText}>No past events yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#232323" },
  headerCard: {
    backgroundColor: "#2E2E2E",
    borderRadius: 22,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: { color: "#F2B01E", fontSize: 22, fontWeight: "700" },
  levelPill: {
    backgroundColor: "#F2B01E",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  levelText: { color: "#000000", fontWeight: "700", fontSize: 12 },
  progressTrack: {
    height: 8,
    backgroundColor: "#3A3A3A",
    borderRadius: 999,
    marginBottom: 4,
  },
  progressFill: { height: 8, backgroundColor: "#F2B01E", borderRadius: 999 },
  caption: { color: "#7A7A75", fontSize: 12 },
  bioRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  bioBubble: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#2E2E2E",
    borderRadius: 14,
    padding: 8,
  },
  bioText: { color: "#B8B8B0", fontSize: 14 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  statValue: { color: "#F5F5F0", fontSize: 28, fontWeight: "700" },
  statSub: { color: "#B8B8B0", fontSize: 14 },
  inviteBtn: {
    borderWidth: 1.5,
    borderColor: "#F2B01E",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  inviteLabel: { color: "#F2B01E", fontWeight: "700", fontSize: 15 },
  tabRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4A",
    paddingBottom: 8,
  },
  tabLabel: { color: "#B8B8B0", fontSize: 14 },
  tabLabelActive: { color: "#F2B01E", fontWeight: "700" },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#2E2E2E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F2B01E",
    padding: 8,
  },
  eventThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#1C1C1C",
  },
  eventTitle: { color: "#F5F5F0", fontSize: 16, fontWeight: "600" },
});
