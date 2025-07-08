import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Platform } from "react-native";

type FormProps = {
  onDateChange: (month: number, date: number) => void;
};

export default function DisplayForm({ onDateChange }: FormProps) {
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<string>(""); // keep as string for input
  const [fact, setFact] = useState<string>("");

  const handleMonthChange = (value: number | undefined) => {
    setMonth(value);
    const chosenDay = parseInt(day, 10);
    if (value && chosenDay >= 1 && chosenDay <= 31) {
      onDateChange(value, chosenDay);
    }
  };

  // When day changes, also trigger onDateChange if month is set
  const handleDayChange = (value: string) => {
    setDay(value);
    const chosenDay = parseInt(value, 10);
    if (month && chosenDay >= 1 && chosenDay <= 31) {
      onDateChange(month, chosenDay);
    }
  };

  useEffect(() => {
    // Only fetch if both valid
    const chosenDay = parseInt(day, 10);
    if (month && chosenDay >= 1 && chosenDay <= 31) {
      fetchFact(month, chosenDay);
    }
  }, [month, day]);

  const fetchFact = async (month: number, day: number) => {
    try {
      const response = await axios.get(
        `https://numbersapi.p.rapidapi.com/${month}/${day}/date`,
        {
          headers: {
            "X-RapidAPI-Key":
              "fe2e197d65mshf0e1952758929aap1b4084jsnd72dfe652000",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
          params: { json: true },
        }
      );
      setFact(response.data.text);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch fact.");
      setFact("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={month}
          onValueChange={handleMonthChange}
          style={styles.picker}
        >
          <Picker.Item label="Select a month" value={undefined} />
          <Picker.Item label="January" value={1} />
          <Picker.Item label="February" value={2} />
          <Picker.Item label="March" value={3} />
          <Picker.Item label="April" value={4} />
          <Picker.Item label="May" value={5} />
          <Picker.Item label="June" value={6} />
          <Picker.Item label="July" value={7} />
          <Picker.Item label="August" value={8} />
          <Picker.Item label="September" value={9} />
          <Picker.Item label="October" value={10} />
          <Picker.Item label="November" value={11} />
          <Picker.Item label="December" value={12} />
        </Picker>

        <TextInput
          style={styles.pickerInput}
          value={month !== undefined ? month.toString() : ""}
          editable={false}
          placeholder="Selected month number"
        />
      </View>

      <Text style={styles.label}>Day (1–31)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter day (e.g. 7)"
        value={day}
        onChangeText={handleDayChange}
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
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
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
  pickerContainer: {
    borderWidth: Platform.OS === "ios" ? 1 : 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: Platform.OS === "ios" ? 30 : 10, // Add space below picker on iOS
    width: 200,
    overflow: "hidden",
    height: Platform.OS === "ios" ? 180 : 55, // Give it full space on iOS to avoid overlap
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 180 : 55, // match the container
  },
  pickerInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 1,
    marginBottom: 10,
    textAlign: "center",
    color: "#555",
  },
});
