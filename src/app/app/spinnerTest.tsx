import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const spinnerTest = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>spinnerTest</Text>
      </View>
    </SafeAreaView>
  );
};

export default spinnerTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
