import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Search,
} from "lucide-react-native";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ADVENTURES = [
  {
    id: "dark-things",
    title: "Where Dark Things Dwell",
    duration: "35h 45m",
    locked: false,
    image: require("../../../assets/images/explore/whereDark.jpg"),
  },
  {
    id: "station-m",
    title: "Station M",
    duration: null,
    locked: true,
    image: require("../../../assets/images/explore/stationM.jpg"),
  },
  {
    id: "dragons-song",
    title: "The Dragon's Song",
    duration: null,
    locked: true,
    image: require("../../../assets/images/explore/dragonSong.jpg"),
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [exploreNearby, setExploreNearby] = useState(true);

  const unlocked = ADVENTURES.filter((a) => !a.locked);
  const locked = ADVENTURES.filter((a) => a.locked);

  const goToGroups = (adventureId: string) => {
    router.push(`/app/viewGroup`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#F2B01E" />
        </Pressable>
        <Pressable onPress={() => {}}>
          <Search size={22} color="#F2B01E" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Toggle Header */}
        <View style={styles.toggleRow}>
          <Switch
            value={exploreNearby}
            onValueChange={setExploreNearby}
            trackColor={{ false: "#3A3A3A", true: "#F2B01E" }}
            thumbColor={exploreNearby ? "#232323" : "#B8B8B0"}
            style={styles.switchStyle}
          />
          <Text style={styles.toggleLabel}>Explore Nearby</Text>
        </View>

        <Text style={styles.title}>Find Your Next Mystery</Text>

        {/* Filter Badges */}
        <View style={styles.filterRow}>
          <View style={styles.filterActive}>
            <Text style={styles.filterActiveText}> Location</Text>
          </View>
          <View style={styles.filterMuted}>
            <Text style={styles.filterMutedText}> Scary Level</Text>
          </View>
          <View style={styles.filterMuted}>
            <Text style={styles.filterMutedText}>Genre</Text>
          </View>
          <View style={styles.filterPlus}>
            <Text style={styles.filterMutedText}>+</Text>
          </View>
        </View>

        {/* Unlocked Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Unlocked</Text>
          <View style={styles.sectionDivider} />
        </View>

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
            <ImageBackground
              source={a.image}
              style={styles.cardImage}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              {a.duration && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{a.duration}</Text>
                </View>
              )}
            </ImageBackground>
            <View style={styles.cardFooter}>
              <Text style={[styles.cardTitle, styles.cardTitleUnlocked]}>
                {a.title}
              </Text>
              <View style={styles.iconCircleUnlocked}>
                <ArrowRight size={18} color="#232323" />
              </View>
            </View>
          </Pressable>
        ))}

        {/* Locked Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Locked</Text>
          <View style={styles.sectionDivider} />
        </View>

        {locked.map((a) => (
          <Pressable
            key={a.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressed,
              styles.container,
            ]}
          >
            {/*  <Pressable
             key={a.id}
             onPress={() => goToGroups(a.id)}
             style={({ pressed }) => [styles.card, pressed && styles.pressed]}
           > */}
            {/* Direct image prop instead of uri object */}
            <ImageBackground
              source={a.image}
              style={styles.cardImage}
              imageStyle={styles.imageRadius}
            >
              {/* <View style={styles.overlay} /> */}
              <View style={styles.lockBadge}>
                <LockKeyhole size={16} color="#B8B8B0" />
              </View>
            </ImageBackground>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{a.title}</Text>
              <View style={styles.iconCircleLocked}>
                <ArrowRight size={18} color="#B8B8B0" />
              </View>
            </View>
            {/* </Pressable> */}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: 4,
    marginLeft: -6,
  },
  toggleLabel: {
    color: "#F2B01E",
    fontSize: 15,
    fontWeight: "500",
  },
  title: {
    color: "#F2B01E",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  filterActive: {
    borderWidth: 1,
    borderColor: "#F2B01E",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(242, 176, 30, 0.1)",
  },
  filterActiveText: {
    color: "#F2B01E",
    fontSize: 13,
    fontWeight: "500",
  },
  filterMuted: {
    borderWidth: 1,
    borderColor: "#4A4A4A",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#2B2B2B",
  },
  filterMutedText: {
    color: "#D0D0C8",
    fontSize: 13,
  },
  filterPlus: {
    borderWidth: 1,
    borderColor: "#4A4A4A",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#2B2B2B",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionLabel: {
    color: "#8A8A85",
    fontSize: 13,
    fontWeight: "500",
    marginRight: 10,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#3A3A38",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A3A38",
    backgroundColor: "#2B2B2B",
  },
  cardUnlocked: {
    borderColor: "#F2B01E",
  },
  cardImage: {
    height: 140,
    width: "100%",
    justifyContent: "space-between",
    padding: 12,
    // backgroundColor: "#2B2B2B",
  },
  overlay: {
    backgroundColor: "rgba(6, 5, 5, 0.5)",
  },
  imageRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  durationBadge: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  lockBadge: {
    alignSelf: "flex-end",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#2A2A2A",
  },
  cardTitle: {
    color: "#E0E0D8",
    fontSize: 18,
    fontWeight: "600",
  },
  cardTitleUnlocked: {
    color: "#FFFFFF",
  },
  iconCircleUnlocked: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2B01E",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircleLocked: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5A5A55",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  container: {
    backgroundColor: "rgba(46, 46, 46)",
    opacity: 0.5,
  },
});
