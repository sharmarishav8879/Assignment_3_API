import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function APIcall() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

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
            'X-RapidAPI-Key': 'fe2e197d65mshf0e1952758929aap1b4084jsnd72dfe652000',
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
          },
          params: { json: true },
        }
      );

      setFact(response.data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
      Alert.alert('Error', 'Could not fetch fact. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Month</Text>
      <Picker
        selectedValue={month}
        onValueChange={(itemValue) => setMonth(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="-- Select Month --" value="" />
        {[
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ].map((name, index) => (
          <Picker.Item key={index} label={name} value={(index + 1).toString()} />
        ))}
      </Picker>

      <Text style={styles.title}>Enter Day</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter day (1–31)"
        value={day}
        onChangeText={setDay}
      />

      {fact !== '' && (
        <View style={styles.factBox}>
          <Text style={styles.factText}>{fact}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  factBox: {
    backgroundColor: '#cfe9ff',
    padding: 15,
    borderRadius: 8,
  },
  factText: {
    fontSize: 16,
    color: '#333',
  },
});
