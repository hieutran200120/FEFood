import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { CartQuantityButton, FooterTotal, Header, IconButton, StepperInput } from '../components';
import { COLORS } from "../constants";
import icons from "../constants/icons";
import { CartContext } from '../context/CartContext';
import { CartContextType, CartItem, NavigationProp } from '../types';
interface MyCartProps {
  navigation: NavigationProp;
}
const MyCart: React.FC<MyCartProps> = ({ navigation }) => {
  const { cartItems, deleteCartItem, totalPrice, increaseQuantity, decreaseQuantity } = useContext(CartContext) as CartContextType;
  console.log(cartItems)
  useEffect(() => {
    // Effect for monitoring cart changes
  }, [cartItems]);

  function renderHeader() {
    return (
      <Header
        title="Giỏ hàng"
        containerStyle="h-15 px-4 mt-5 items-center"
        leftComponent={
          <TouchableOpacity
            className="p-2"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        }
        rightComponent={
          <CartQuantityButton
            quantity={cartItems.length}
            onPress={() => { }}
          />
        }
      />
    );
  }

  function renderCartList() {
    return (
      <SwipeListView
        data={cartItems}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: 10,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={({ item }: { item: CartItem }) => (
          <View className="flex-row items-center h-24 bg-gray-200 rounded-lg mt-2 px-3 py-1">
            {/* Food Image */}
            <View className="w-20 h-[90px] -ml-2.5 relative">
              <Image
                source={{ uri: `http://192.168.9.110:45455/Images/${item.image?.[0].toString()}` }}
                resizeMode="contain"
                className="w-full h-full absolute top-0"
              />
            </View>

            {/* Food Info */}
            <View className="flex-1 ml-2.5">
              <Text className="text-sm font-medium" numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                className="text-base font-bold"
                style={{ color: COLORS.primary }}
              >
                {new Intl.NumberFormat("vi-VN").format(item.price || 0) + "₫"}
              </Text>
            </View>

            {/* Quantity Control */}
            <StepperInput
              containerStyle="h-12 w-32 bg-white"
              value={item.quantity}
              onAdd={() => increaseQuantity(item.id)}
              onMinus={() => {
                if (item.quantity > 1) {
                  decreaseQuantity(item.id);
                }
              }}
            />
          </View>
        )}
        renderHiddenItem={(data) => (
          <View className="flex-1 flex-row justify-end items-center bg-primary rounded-lg mt-2 h-24"
          >
            <IconButton
              containerStyle="w-[75px] h-full justify-center items-center"
              icon={icons.delete_icon}
              iconStyle={{ tintColor: 'white' }}
              onPress={() => deleteCartItem(data.item.id)}
            />
          </View>
        )}
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      {renderHeader()}
      {cartItems.length > 0 ? (
        renderCartList()
      ) : (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="cart" size={64} color="#ccc" />
          <Text className="mt-4 text-gray-500">Giỏ hàng trống</Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <FooterTotal
          subTotal={Number(totalPrice) || 0}
          shippingFee={0.00}
          total={Number(totalPrice) || 0}
          onPress={() => navigation.navigate("order")}
        />
      )}

    </View>
  );
};

export default MyCart;