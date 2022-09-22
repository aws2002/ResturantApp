import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { urlFor } from "../../sanity";
import {
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../store/features/restaurantSlice";
const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        addres,
        short_description,
        dishes,
      })
    );
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View style={tw`relative`}>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            style={tw`w-full h-56 bg-gray-300`}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`absolute top-14 left-5 bg-black p-2 rounded-full`}
          >
            <FontAwesome5 name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={tw`bg-black`}>
          <View style={tw`px-4 pt-4`}>
            <Text style={tw`text-white font-bold text-3xl`}>{title}</Text>
            <View style={tw`flex-row my-1`}>
              <View style={tw`flex-row my-1 items-center mr-3`}>
                <MaterialIcons
                  name="star"
                  size={22}
                  color="white"
                  style={tw`opacity-90	`}
                />
                <Text style={tw`text-white text-xs ml-1`}>
                  <Text style={tw`text-green-500`}>{rating} </Text>* {genre}
                </Text>
              </View>

              <View style={tw`flex-row my-1 items-center`}>
                <Ionicons
                  name="md-location-sharp"
                  size={22}
                  color="white"
                  style={tw`opacity-90	`}
                />
                <Text style={tw`text-white text-xs ml-1`}>
                  Nearby * {addres}
                </Text>
              </View>
            </View>
            <Text style={tw`text-white mt-2 pb-4`}>{short_description}</Text>
          </View>
          <TouchableOpacity
            style={tw`flex-row items-center border-t border-b p-4 border-gray-300/46`}
          >
            <AntDesign name="questioncircleo" size={20} color="white" />
            <Text style={tw`flex-1 pl-2 text-[16px] font-bold text-white `}>
              Have a food allegry?
            </Text>
            <AntDesign name="caretright" size={20} color="white" />
          </TouchableOpacity>
          <View style={tw`bg-neutral-900 pb-36`}>
            <View style={tw`border-b border-gray-300/46`}>
              <Text style={tw`px-4 pt-6 mb-3 font-bold text-white text-xl`}>
                Mneu
              </Text>
            </View>
            {dishes.map((item) => (
              <DishRow
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.short_description}
                price={item.price}
                image={item.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
