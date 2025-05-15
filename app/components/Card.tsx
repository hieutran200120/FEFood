import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Image, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { CartContext } from '../context/CartContext';
import { CartContextType, Food, NavigationProp } from '../types';

interface CardProps {
  food: Food;
  navigation: NavigationProp; // Đánh dấu là tùy chọn vì chúng ta có thể sử dụng useNavigation hook
}

const Card: React.FC<CardProps> = ({ food, navigation: navigationProp }) => {
  const { addToCartItem } = useContext(CartContext) as CartContextType;
  // Sử dụng navigation từ props nếu có, nếu không thì dùng useNavigation hook
  const navigation = navigationProp || useNavigation();

  const handleAddToCart = () => {
    const product = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: 1,
      image: food.image,
      description: food.description || '', // Đảm bảo các trường cần thiết được bao gồm
    };

    addToCartItem(product);
    Toast.show({
      type: 'success',
      text1: 'Thêm vào giỏ hàng thành công!',
      text2: `${food.name} đã được thêm.`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleNavigate = useCallback(() => {
    navigation.navigate('FoodDetail', { id: food.id });
  }, [food.id, navigation]);

  return (
    <TouchableHighlight
      underlayColor="white"
      activeOpacity={0.9}
      onPress={handleNavigate}
      className="mx-2 mt-12 mb-5 rounded-xl bg-white shadow-md w-[160px] h-[220px]"
    >
      <View className="flex-1">
        {/* Image */}
        <View className="items-center -mt-10">
          {food.image && food.image.length > 0 ? (
            <Image
              source={{ uri: `http://192.168.9.110:45455/Images/${food.image[0]}` }}
              className="w-[140px] h-[120px] rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="w-[140px] h-[120px] bg-gray-200 rounded-lg items-center justify-center">
              <Text className="text-gray-500">No Image</Text>
            </View>
          )}
        </View>

        {/* Name & Ingredients */}
        <View className="px-4 mt-2">
          <Text className="text-base font-bold" numberOfLines={1}>
            {food.name}
          </Text>
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {food.description ? food.description.substring(0, 30) + (food.description.length > 30 ? '...' : '') : ''}
          </Text>
        </View>

        {/* Price & Add Button */}
        <View className="px-4 mt-auto mb-3 flex-row justify-between items-center">
          <Text className="text-base font-bold text-black">
            {new Intl.NumberFormat('vi-VN').format(food.price)}₫
          </Text>
          <TouchableOpacity
            onPress={handleAddToCart}
            className="w-[30px] h-[30px] bg-orange-500 rounded-full justify-center items-center"
          >
            <Ionicons name="add-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Card;