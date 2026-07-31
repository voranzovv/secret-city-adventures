import { StyleSheet, Text, View } from "react-native";

const TestPage = () => {
  return (
    <View style={styles.container}>
      <Text>TestPage</Text>
    </View>
  );
};

export default TestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
