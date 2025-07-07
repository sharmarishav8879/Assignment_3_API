import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import axios from "axios";

type FormProps = {
  onDateChange?: () => void;
};

export default function DisplayForm({ onDateChange }: FormProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");

  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  const fetchFact = async () => {
    try {
      const response = await axios.get(
        `https://numbersapi.p.rapidapi.com/${month}/${day}/date`,
        {
          headers: {
            "X-RapidAPI-Key":
              "fe2e197d65mshf0e1952758929aap1b4084jsnd72dfe652000", // ✅ replace with yours if needed
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
          params: { json: true },
        }
      );

      setFact(response.data.text);
      if (onDateChange) onDateChange();
    } catch (error) {
      Alert.alert("Error", "Failed to fetch fact.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>textIncomponent</Text>

      <Text style={styles.label}>Month (1–12)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter month (e.g. 4)"
        value={month}
        onChangeText={setMonth}
      />

      <Text style={styles.label}>Day (1–31)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter day (e.g. 7)"
        value={day}
        onChangeText={setDay}
      />

      {fact !== "" && (
        <View style={styles.factBox}>
          <Text style={styles.factText}>{fact}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "thin",
    marginBottom: 20,
    textAlign: "left",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  factBox: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 6,
  },
  factText: {
    fontSize: 14,
    color: "#333",
  },
});
