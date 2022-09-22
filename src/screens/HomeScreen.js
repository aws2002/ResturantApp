import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { client } from "../../sanity";
import { Feather, AntDesign ,FontAwesome,Ionicons} from "@expo/vector-icons";

import tw from "twrnc";
const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  },[]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useEffect(() => {
    client.fetch(`*[_type=="featured"]{
         ...,
         restaurants[]->{
           ...,
           dishes[]->
         }
      }`).then(data=>setFeaturedCategories(data));
  }, []);
  
  return (
    <SafeAreaView style={tw`bg-black pt-5`}>
      {/* {Header} */}
      <View style={tw`flex-row pb-3 mx-4 items-center`}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`w-10 h-10 p-4 rounded-full bg-gray-300`}
        />
        <View style={tw`flex-1 ml-2`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={tw`font-bold text-xl text-white`}>
            Current Locationn
          </Text>
        </View>
        {/* {usericon} */}

        <View>
          <Feather name="user" size={30} color="white" />
        </View>
      </View>
      <View style={tw`flex-row items-center  mx-4 pb-2`}>
        <View style={tw`flex-row flex-1 p-3 bg-gray-600`}>
          <AntDesign name="search1" size={20} color="white" style={tw`mr-1`} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            placeholderTextColor={"#b7bec5"}
          />
        </View>
        {/* {icon} */}
        <View>
        <FontAwesome name="filter" size={30} color="white" style={tw`ml-4`}/>
          {/* <Image
            style={tw`w-8 h-8 ml-2`}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617239.png",
            }}
          /> */}
        </View>
      </View>

      {/* {Body} */}
      <ScrollView showsVerticalScrollIndicator={false} style={tw`mb-20`}>
        <Categories />
        {featuredCategories?.map((item) => (
          <FeaturedRow
            id={item._id}
            key={item._id}
            title={item.name}
            descripttion="Paid placement from our partners"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
