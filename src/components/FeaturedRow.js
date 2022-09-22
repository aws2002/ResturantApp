import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { client } from "../../sanity";
const FeaturedRow = ({ id, title, descripttion }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type=="featured" && _id==$id]{
         ...,
         restaurants[]->{
           ...,
           dishes[]->,
           type->{
            name
           }
         },
      }[0]`,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  return (
    <View style={tw`bg-neutral-900`}>
      <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw`font-bold text-lg text-white`}>{title}</Text>
        <Feather name="arrow-right" size={30} color="white" />
      </View>
      <Text style={tw`text-xs text-gray-500 px-4`}>{descripttion}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        style={tw`mt-4`}
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            addres={restaurant.addres}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
