import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasketItmes,
  selectBasketTotal,
} from "../store/features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const BasketIcon = () => {
  const items = useSelector(selectBasketItmes);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  if (items.length === 0) return null;
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 4,
});
  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={tw`mx-5 bg-[#00ccbb] p-3 rounded-lg flex-row items-center`}
      >
        <View style={tw` rounded-md bg-[#01a296]`}>
          <Text style={tw`text-white font-extrabold text-lg  py-1 px-2`}>
            {items.length}
          </Text>
        </View>
        <Text style={tw`text-white font-extrabold text-lg flex-1 text-center`}>
          View Basket
        </Text>
        <Text style={tw`text-white font-extrabold text-lg`}>
          {/* ${basketTotal} */}
          {dollarUS.format(basketTotal)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
