import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Skull, Star } from "lucide-react-native";
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const REVIEWS = [
  {
    id: "1",
    rating: 4,
    title: "An eerie affair",
    text: "Prepared to face the dark? Test your courage within the shadowy confines of a historic village alongside its eerie inhabitants.",
    author: "Name",
  },
  {
    id: "2",
    rating: 4,
    title: "An eerie affair",
    text: "Prepared to face the dark? Test your courage within the shadowy confines of a historic village alongside its eerie inhabitants.",
    author: "Name",
  },
];

export default function AdventureDetailScreen() {
  const router = useRouter();

  // 3 filled skulls out of 5 for difficulty
  const maxDifficulty = 5;
  const currentDifficulty = 3;

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <View style={styles.backButton}>
            <ArrowLeft size={18} color="#F2B01E" />
          </View>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Main Card Container with Gold Border */}
        <View style={styles.cardContainer}>
          {/* Banner Image */}
          <ImageBackground
            source={require("../../../assets/images/explore/whereDark.jpg")}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
            resizeMode="cover"
          >
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>35h 45m</Text>
            </View>
          </ImageBackground>

          {/* Title & Difficulty */}
          <Text style={styles.title}>Where Dark Things Dwell</Text>
          <Text style={styles.difficultyLabel}>Difficulty</Text>

          <View style={styles.skullsRow}>
            {Array.from({ length: maxDifficulty }).map((_, index) => {
              const isActive = index < currentDifficulty;
              return (
                <Skull
                  key={index}
                  size={22}
                  color={isActive ? "#F2B01E" : "#5A5A55"}
                  fill={isActive ? "#F2B01E" : "transparent"}
                  style={styles.skullIcon}
                />
              );
            })}
          </View>

          {/* Description Quote */}
          <Text style={styles.description}>
            &quot;Greetings, stranger. You may notice something... odd about
            this place. Lately, the people of the Village at Black Creek have
            been possessed by something vile in nature. I fear a terrible evil
            has set root here. Please stranger, you are only a visitor to this
            place but... Will you help me unravel this dark plot?&quot;
          </Text>

          {/* Reviews Horizontal Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsContainer}
          >
            {REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.starsRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      color={i < review.rating ? "#F2B01E" : "#5A5A55"}
                      fill={i < review.rating ? "#F2B01E" : "transparent"}
                    />
                  ))}
                </View>
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <Text style={styles.reviewText}>{review.text}</Text>
                <View style={styles.reviewDivider} />
                <Text style={styles.reviewAuthor}>{review.author}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Action Buttons */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            // onPress={() => router.push("/app/groups")}
          >
            <Text style={styles.secondaryButtonText}>View Groups</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            // onPress={() => {}}
          >
            <Text style={styles.primaryButtonText}>Experience It</Text>
            <View style={styles.actionIconCircle}>
              <ArrowRight size={18} color="#232323" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1C1C1A",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#F2B01E",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#F2B01E",
    borderRadius: 24,
    backgroundColor: "#252523",
    padding: 16,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 170,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 16,
  },
  heroImageRadius: {
    borderRadius: 16,
    overflow: "hidden",
  },
  durationBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: "#D0D0C8",
    fontSize: 13,
  },
  title: {
    color: "#F5F5F0",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  difficultyLabel: {
    color: "#8A8A85",
    fontSize: 12,
    marginBottom: 6,
  },
  skullsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 16,
  },
  skullIcon: {
    marginHorizontal: 1,
  },
  description: {
    color: "#D0D0C8",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  reviewsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  reviewCard: {
    width: 220,
    backgroundColor: "#2E2E2C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3E3E3B",
    padding: 14,
  },
  starsRow: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 8,
  },
  reviewTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  reviewText: {
    color: "#B0B0A8",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: "#3E3E3B",
    marginBottom: 8,
  },
  reviewAuthor: {
    color: "#8A8A85",
    fontSize: 12,
  },
  secondaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F2B01E",
    backgroundColor: "#333330",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F2B01E",
    backgroundColor: "#333330",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  actionIconCircle: {
    position: "absolute",
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2B01E",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});
