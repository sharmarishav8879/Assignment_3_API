import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import DisplayForm from "../component/displayForm"; // ✅ make sure folder name is 'component'

export default function App() {
  return (
    <View style={styles.container}>
      <DisplayForm />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
