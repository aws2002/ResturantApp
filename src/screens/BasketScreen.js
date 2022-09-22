import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../store/features/restaurantSlice";
import {
  removeFormBasket,
  selectBasketItmes,
  selectBasketTotal,
} from "../store/features/basketSlice";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { urlFor } from "../../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItmes);
  const dispatch = useDispatch();
  const basketTotal=useSelector(selectBasketTotal)
  const [grouperdItemsInBasket, setGrouperdItemsInBasket] = useState([]);

  useEffect(() => {
    const grouperdItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGrouperdItemsInBasket(grouperdItems);
  }, [items]);

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 4,
});
  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`flex-1 bg-neutral-900`}>
        <View style={tw`p-5 border-b border-gray-700 bg-black`}>
          <View>
            <Text style={tw`text-lg font-bold text-center text-white`}>
              Basket
            </Text>
            <Text style={tw`text-center text-white`}>{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`top-3 right-5 absolute bg-[#00ccbb] p-1 rounded-full`}
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center px-4 py-3 my-5 bg-black`}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={tw`h-7 w-7 rounded-full p-4 bg-gray-500`}
          />
          <Text style={tw`flex-1 text-white ml-4`}>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#00ccbb]`}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(grouperdItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw`flex-row items-center bg-black py-2 px-5`}
            >
              <Text style={tw`text-[#00ccbb]`}>{items.length} x </Text>
              <Image
                style={tw`w-12 h-12 rounded-full mx-3`}
                source={{ uri: urlFor(items[0]?.image).url() }}
              />
              <Text style={tw`flex-1 text-white`}>{items[0]?.name}</Text>
              <Text style={tw`text-gray-300 mr-3`}>${items[0]?.price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFormBasket({ id: key }))}
              >
                <Text style={tw`text-xs text-[#00ccbb]`}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={tw`p-5 mt-5 bg-black`}>
            <View style={tw`flex-row justify-between mb-4`}>
              <Text style={tw`text-white`}>Subtotal</Text>
              <Text style={tw`text-white`}>{dollarUS.format(basketTotal)}</Text>
            </View>
            <View style={tw`flex-row justify-between mb-4`}>
              <Text style={tw`text-white`}>Delivery Fee</Text>
              <Text style={tw`text-white`}>$5.5</Text>
            </View>

            <View style={tw`flex-row justify-between mb-4`}>
              <Text style={tw`text-white font-extrabold`}>Order Total</Text>
              <Text style={tw`text-white font-extrabold`}>{dollarUS.format(basketTotal +5.5)} </Text>
            </View>
            <TouchableOpacity style={tw`rounded-lg bg-[#00ccbb] p-4`} onPress={()=>navigation.navigate("PreparingOrderScreen")}>
              <Text style={tw`text-white font-bold text-lg text-center`}>Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
