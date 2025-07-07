import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type FormProps = {
  onDateChange: (month: number, date: number) => void;
};

export default function DisplayForm({ onDateChange }: FormProps) {
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<string>("");

  const handleMonthChange = (value: number) => {
    setMonth(value);
    const chosenDay = parseInt(day, 10);
    if (value && chosenDay >= 1 && chosenDay <= 31) {
      onDateChange(value, chosenDay);
    }
  };

  const handleDayChange = (text: string) => {
    setDay(text);
    const chosenDay = parseInt(text, 10);
    if (month && chosenDay >= 1 && chosenDay <= 31) {
      onDateChange(month, chosenDay);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={month}
          onValueChange={handleMonthChange}
          style={styles.picker}
        >
          <Picker.Item label="Select a month" value={null} />
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
          editable={false} // so user can't change this directly
          placeholder="Selected month number"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter a date (1-31)"
        value={day}
        onChangeText={handleDayChange}
        keyboardType="numeric"
        maxLength={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    width: "100%",
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
});
