import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { urlFor } from "../../sanity";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  selectBasketItmesWithId,
  removeFormBasket,
} from "../store/features/basketSlice";
const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItmesWithId(state, id));
  const dispatch = useDispatch();
  const addItmeToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItmeToBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFormBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={tw`p-4 border-b border-gray-300/46 ${isPressed && "border-b-0"}`}
      >
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-lg mb-1 text-white`}>{name}</Text>
            <Text style={tw`text-gray-400`}>{description}</Text>
            <Text style={tw`text-gray-400 mt-2`}>${price}</Text>
          </View>
          <View>
            <Image
              style={tw`h-24 w-24 p-4 bg-gray-300 rounded`}
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw`px-4`}>
          <View style={tw`flex-row items-center pb-3`}>
            <TouchableOpacity onPress={removeItmeToBasket} disabled={!items.length}>
              <FontAwesome5
                name="minus-circle"
                size={22}
                color={items.length > 0 ? "white" : "#00ccbb"}
              />
            </TouchableOpacity>
            <Text style={tw`text-white px-3`}>{items.length}</Text>
            <TouchableOpacity onPress={addItmeToBasket}>
              <FontAwesome5 name="plus-circle" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
