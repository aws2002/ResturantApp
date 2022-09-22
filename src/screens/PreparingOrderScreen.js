import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
        navigation.navigate("Delivery")
    },4000)
  },[])
  return (
    <SafeAreaView style={tw`bg-black flex-1 justify-center items-center`}>
      <Text style={tw`text-white`}>
        Waiting for Restaurant to accept your order!
      </Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
