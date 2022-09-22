import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  addres,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          addres,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={tw`bg-neutral-700 rounded-md overflow-hidden mr-3 shadow`}
    >
      <Image style={tw`w-64 h-36`} source={{ uri: urlFor(imgUrl).url() }} />

      <View style={tw`px-3 pb-4`}>
        <Text style={tw`font-bold text-lg pt-2 text-white`}>{title}</Text>
        <View style={tw`flex-row items-center`}>
          {/* icon  */}
          <Ionicons name="location-outline" size={20} color="white" />
          <Text style={tw`text-white text-xs ml-1`}>
            <Text style={tw`text-green-500`}>{rating} </Text>* {genre}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
