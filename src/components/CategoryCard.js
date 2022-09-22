import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { urlFor } from "../../sanity";
const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={tw`relative mr-2`}>
      <Image
        source={{ uri:urlFor(imgUrl).url()}}
        style={tw`w-20 h-20 rounded`}
      />
      <Text style={tw`absolute bg-green-500 px-1 rounded-lg overflow-hidden bottom-1 left-1 text-white font-bold`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
