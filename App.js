import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, RestaurantScreen,BasketScreen,PreparingOrderScreen,DeliveryScreen } from "./src";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} options={
            {presentation:"modal",headerShown:false}
          }/>
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} options={
            {presentation:"fullScreenModal",headerShown:false}
          }/>
          <Stack.Screen name="Delivery" component={DeliveryScreen} options={
            {presentation:"fullScreenModal",headerShown:false}
          }/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
