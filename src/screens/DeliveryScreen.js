import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../store/features/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  return (
    <View style={tw`bg-black flex-1`}>
      <SafeAreaView style={tw`z-50`}>
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={tw`bg-[#00ccbb] p-1 rounded-full`}
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-lg font-light`}>Order Help</Text>
        </View>
        <View style={tw`mx-4 my-2 rounded-md p-6 z-50 bg-neutral-900`}>
          <View style={tw`flex-row justify-between`}>
            <View>
              <Text style={tw`text-white text-lg`}>Estimated Arrival</Text>
              <Text style={tw`text-4xl font-bold text-white`}>
                45-55 Minutes
              </Text>
            </View>
            <Image
              style={tw`h-20 w-20`}
              source={{ uri: "https://links.papareact.com/fls" }}
            />
          </View>
          <Text style={tw`text-white`}>
            Your order ad {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        style={tw`flex-1 -mt-10 z-0`}
        mapType="mutedStandard"
        initialRegion={{
          latitude: 200,
          longitude: 100,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          title={restaurant.title}
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        ></Marker>
      </MapView>
      <SafeAreaView style={tw`flex-row h-28 items-center`}>
      <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`w-12 h-12 ml-5 mr-3 p-4 rounded-full bg-gray-300`}
        />
        <View style={tw`flex-1`}>
            <Text style={tw`text-lg text-white`}>Osama Husam</Text>
            <Text style={tw`text-white`}>Your Rider</Text>
        </View>
        <Text style={tw`text-lg text-[#00ccbb] mr-4 font-bold`}>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
