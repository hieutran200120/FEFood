import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  quantity: number;
  onPress: () => void;
};

const CartQuantityButton: React.FC<Props> = ({ containerStyle, quantity, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      className="w-10 h-10 bg-orange-500 rounded-lg justify-center items-center relative"
    >
      <Ionicons name="cart-sharp" size={20} color="white" />
      <View className="absolute top-1 right-1 w-[15px] h-[15px] bg-white rounded-full items-center justify-center">
        <Text className="text-[10px] text-black text-center leading-[15px]">{quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartQuantityButton;
