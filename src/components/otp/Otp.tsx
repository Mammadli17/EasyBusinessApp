import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const OtpInput = () => {
  const numberOfInputs = 4;
  const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < numberOfInputs - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Confirmation</Text>
      <Text style={styles.subtitle}>Please enter the 4-digit OTP sent to your email.</Text>
      <View style={styles.inputRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            style={[
              styles.input,
              digit ? styles.inputFilled : styles.inputEmpty,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 34,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: 'hsla(180, 98%, 17%, 1)',
  },
  subtitle: {
    fontSize: 14,
    color: 'hsla(254, 48%, 9%, 0.74)',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  input: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
  },
  inputFilled: {
    borderColor: '#00796B',
  },
  inputEmpty: {
    borderColor: '#ccc',
  },
});

export default OtpInput;
