import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const ADVENTURES = [
  {
    id: "dark-things",
    title: "Where Dark Things Dwell",
    duration: "35H 45M",
    locked: false,
  },
  { id: "station-m", title: "Station M", duration: null, locked: true },
  {
    id: "dragons-song",
    title: "The Dragon's Song",
    duration: null,
    locked: true,
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const unlocked = ADVENTURES.filter((a) => !a.locked);
  const locked = ADVENTURES.filter((a) => a.locked);

  const goToGroups = (adventureId: string) => {
    router.push(`/app/explore`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.toggleLabel}>Explore Nearby</Text>
        <Settings size={20} color="#B8B8B0" />
      </View>

      <Text style={styles.title}>FIND YOUR NEXT MYSTERY</Text>

      <View style={styles.filterRow}>
        <Text style={styles.filterActive}> Location</Text>
        <Text style={styles.filterMuted}>Scary Level</Text>
        <Text style={styles.filterMuted}>Genre</Text>
        <Text style={styles.filterMuted}>+</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Unlocked</Text>
        {unlocked.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => goToGroups(a.id)}
            style={({ pressed }) => [
              styles.card,
              styles.cardUnlocked,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.cardImage}>
              {a.duration && <Text style={styles.duration}>{a.duration}</Text>}
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{a.title}</Text>
              <Text style={styles.arrow}>➡️</Text>
            </View>
          </Pressable>
        ))}

        <Text style={styles.sectionLabel}>Locked</Text>
        {locked.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => goToGroups(a.id)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <View style={styles.cardImage}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{a.title}</Text>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </Pressable>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: { color: "#F2B01E", fontSize: 14 },
  title: {
    color: "#F2B01E",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  filterActive: {
    borderWidth: 1,
    borderColor: "#F2B01E",
    color: "#F2B01E",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
  },
  filterMuted: {
    borderWidth: 1,
    borderColor: "#4A4A4A",
    color: "#B8B8B0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
  },
  sectionLabel: {
    color: "#7A7A75",
    fontSize: 12,
    textTransform: "uppercase",
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    opacity: 0.6,
  },
  cardUnlocked: { borderColor: "#F2B01E", opacity: 1 },
  cardImage: {
    height: 130,
    backgroundColor: "#1C1C1C",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 8,
  },
  duration: { color: "#FFFFFF", fontSize: 12 },
  lockIcon: { fontSize: 16 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2E2E2E",
  },
  cardTitle: { color: "#F5F5F0", fontSize: 16, fontWeight: "600" },
  arrow: { fontSize: 16 },
  pressed: { opacity: 0.8 },
});
