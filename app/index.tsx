import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DisplayForm from "../component/displayForm";

export default function App() {
  return (
    <View style={styles.container}>
      <DisplayForm onDateChange={() => {}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
