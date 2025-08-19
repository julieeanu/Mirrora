import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// ✅ Font imports
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function VerifyCodeScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_700Bold });

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null; // Or loading screen
  }

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    alert(`OTP Entered: ${otp.join("")}`);
    navigation.navigate("CompleteProfile");
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={[styles.backBtn, styles.backBtnTapArea]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={() => {
          if (navigation?.canGoBack()) navigation.goBack();
          else navigation.navigate('CreateAccount'); // ← fallback route in your stack
        }}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        Please enter the code we just sent to email {"\n"}
        <Text style={styles.email}>example@gmail.com</Text>
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      {/* Resend */}
      <Text style={styles.resendText}>
        Didn’t receive OTP?{" "}
        <Text style={styles.resendLink}>Resend code</Text>
      </Text>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  backBtn: {
    position: "absolute",
    top: 80,
    left: 30,
  },
  title: {
    fontFamily: "LeagueSpartan_700Bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    marginTop: -10,
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  email: {
    fontFamily: "Montserrat_400Regular",
    color: "#aaa",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  otpInput: {
    fontFamily: "Montserrat_400Regular",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 10,
  },
  resendText: {
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    fontSize: 13,
    color: "#555",
    marginBottom: 40,
    marginTop: 20,
  },
  resendLink: {
    fontFamily: "Montserrat_700Bold",
    color: "#A67B5B",
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: "#A67B5B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  verifyText: {
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
    fontSize: 16,
  },
});
