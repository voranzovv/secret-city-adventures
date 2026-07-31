import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Group = {
  id: string;
  name: string;
  filled: number;
  capacity: number;
  full: boolean;
};

type AdventureSection = {
  adventureTitle: string;
  purchaseRequired: boolean;
  groups: Group[];
};

const GROUPS_BY_ADVENTURE: Record<string, AdventureSection> = {
  "dark-things": {
    adventureTitle: "Where Dark Things Dwell",
    purchaseRequired: false,
    groups: [
      {
        id: "team-nightshade",
        name: "TEAM NIGHTSHADE",
        filled: 3,
        capacity: 6,
        full: false,
      },
      {
        id: "hollow-crew",
        name: "THE HOLLOW CREW",
        filled: 6,
        capacity: 6,
        full: true,
      },
    ],
  },
  "station-m": {
    adventureTitle: "Station M",
    purchaseRequired: true,
    groups: [
      {
        id: "city-crew",
        name: "CITY CREW",
        filled: 6,
        capacity: 6,
        full: false,
      },
    ],
  },
  "dragons-song": {
    adventureTitle: "The Dragon's Song",
    purchaseRequired: true,
    groups: [
      {
        id: "decca-chronicle",
        name: "DECCA CHRONICLE",
        filled: 6,
        capacity: 6,
        full: false,
      },
    ],
  },
};

export default function JoinScreen() {
  const router = useRouter();
  const { adventureId } = useLocalSearchParams<{ adventureId?: string }>();

  // adventureId can theoretically be string | string[] | undefined — normalize it
  const resolvedId = Array.isArray(adventureId) ? adventureId[0] : adventureId;

  const sections: AdventureSection[] = resolvedId
    ? [GROUPS_BY_ADVENTURE[resolvedId]].filter((s): s is AdventureSection =>
        Boolean(s),
      )
    : Object.values(GROUPS_BY_ADVENTURE);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>JOIN A GROUP</Text>

      <View style={styles.actionRow}>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionLabel}>+ Create a Group</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionLabel}>⇄ Join Randomly</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map((section) => (
          <View key={section.adventureTitle} style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>
              {section.adventureTitle}
              {section.purchaseRequired && (
                <Text style={styles.purchaseNote}>
                  {" "}
                  — Purchase ticket to unlock
                </Text>
              )}
            </Text>

            {section.groups.map((g) => (
              <Pressable
                key={g.id}
                disabled={section.purchaseRequired}
                onPress={() => router.push(`/app/chat`)}
                style={({ pressed }) => [
                  styles.groupCard,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.groupThumb} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.groupName}>{g.name}</Text>
                  <View style={styles.dotsRow}>
                    {Array.from({ length: g.capacity }).map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.dot,
                          i < g.filled ? styles.dotFilled : styles.dotEmpty,
                        ]}
                      />
                    ))}
                  </View>
                </View>
                {section.purchaseRequired ? (
                  <Text style={styles.lockIcon}>lock icon</Text>
                ) : g.full ? (
                  <Text style={styles.fullLabel}>Full</Text>
                ) : (
                  <Text style={styles.arrow}>=&gt;</Text>
                )}
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#232323",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    color: "#F2B01E",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  actionRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  actionBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#F2B01E",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionLabel: { color: "#F2B01E", fontWeight: "700", fontSize: 13 },
  sectionTitle: {
    color: "#F5F5F0",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  purchaseNote: { color: "#7A7A75", fontSize: 12 },
  groupCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
    borderRadius: 14,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4A4A4A",
  },
  groupThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#1C1C1C",
  },
  groupName: { color: "#F5F5F0", fontSize: 16, fontWeight: "600" },
  dotsRow: { flexDirection: "row", gap: 4, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  dotFilled: { backgroundColor: "#F2B01E" },
  dotEmpty: { backgroundColor: "#4A4A4A" },
  lockIcon: { fontSize: 16 },
  fullLabel: { color: "#7A7A75", fontSize: 12 },
  arrow: { fontSize: 16, color: "#F2B01E" },
  pressed: { opacity: 0.8 },
});
