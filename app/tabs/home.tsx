import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Sửa lại cách import Card
import Card from '../components/Card';
import CartQuantityButton from '../components/CartQuantityButton';
import { CartContext } from '../context/CartContext';
import { getCategory } from '../services/categoryService';
import { getFood } from '../services/foodService';
import { BASE_URL, NavigationProp } from '../types';
// Định nghĩa lại kiểu Food nếu không import được từ Card.tsx
export interface Food {
  id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  isFavorite: number;
  categoryName: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryResponse {
  items: Category[];
}

interface FoodResponse {
  items: Food[];
}

interface HomeProps {
  navigation: NavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Sử dụng kiểu any tạm thời để tránh lỗi TypeScript
  const { cartItems } = useContext(CartContext)!;
  // Tách việc lấy dữ liệu thành 2 hàm riêng biệt
  const fetchCategories = async () => {
    try {
      const categoryResponse = await getCategory();
      const categoryData = categoryResponse.items || [];
      setCategories(categoryData);
      return categoryData;
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Không thể tải danh mục. Vui lòng thử lại sau.');
      throw err;
    }
  };

  const fetchFoods = async () => {
    try {
      const foodData: FoodResponse = await getFood();
      setFoods(foodData.items);
      setFilteredFoods(foodData.items);
      return foodData.items;
    } catch (err) {
      console.error('Error loading foods:', err);
      setError('Không thể tải danh sách món ăn. Vui lòng thử lại sau.');
      throw err;
    }
  };
  // Sử dụng useEffect để tải dữ liệu ban đầu
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchCategories(), fetchFoods()]);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Thêm useEffect để lọc món ăn theo danh mục
  useEffect(() => {
    if (categories.length > 0 && foods.length > 0) {
      // Luôn lấy tên danh mục tại vị trí selectedCategoryIndex
      const categoryName = categories[selectedCategoryIndex].name;

      // Nếu món ăn có thuộc tính categoryName thì lọc
      if (foods[0]?.categoryName !== undefined) {
        const filtered = foods.filter(food => food.categoryName === categoryName);
        setFilteredFoods(filtered);
      } else {
        console.warn('Food items do not have categoryName property. Cannot filter by category.');
        setFilteredFoods(foods);
      }
    }
  }, [selectedCategoryIndex, categories, foods]);

  // Hàm tìm kiếm món ăn
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      // Nếu ô tìm kiếm trống, hiển thị lại danh sách theo danh mục
      if (selectedCategoryIndex === 0) {
        setFilteredFoods(foods);
      } else {
        const categoryName = categories[selectedCategoryIndex].name;
        // Kiểm tra xem món ăn có thuộc tính categoryName không
        if (foods[0]?.categoryName !== undefined) {
          const filtered = foods.filter(food => food.categoryName === categoryName);
          setFilteredFoods(filtered);
        } else {
          // Nếu không có thuộc tính categoryName, hiển thị tất cả món ăn
          setFilteredFoods(foods);
        }
      }
    } else {
      // Lọc theo từ khóa tìm kiếm
      const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [foods, selectedCategoryIndex, categories]);

  // Tách Component ListCategories
  const ListCategories = () => {
    if (categories.length === 0) {
      return <ActivityIndicator size="small" color="#FF5722" />;
    }
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="py-6">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategoryIndex(index)}
            activeOpacity={0.8}>
            <View
              className={`flex-row items-center mr-3 px-3 py-2 rounded-full ${selectedCategoryIndex === index ? 'bg-orange-500' : 'bg-orange-200'
                }`}>
              <View className="bg-white w-9 h-9 rounded-full justify-center items-center">
                <Image
                  source={{ uri: `${BASE_URL}/Images/${category.image}` }}
                  className="w-9 h-9 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text
                className={`ml-2 font-bold ${selectedCategoryIndex === index ? 'text-white' : 'text-orange-500'
                  }`}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Component hiển thị khi có lỗi
  const ErrorComponent = () => (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 text-base mb-4">{error}</Text>
      <TouchableOpacity
        className="bg-orange-500 py-2 px-4 rounded-lg"
        onPress={() => {
          setIsLoading(true);
          setError(null);
          Promise.all([fetchCategories(), fetchFoods()])
            .finally(() => setIsLoading(false));
        }}>
        <Text className="text-white font-bold">Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  // Nội dung chính của màn hình
  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
    }

    if (error) {
      return <ErrorComponent />;
    }

    return (
      <>
        <View>
          {ListCategories()}
        </View>
        {filteredFoods.length > 0 ? (
          <FlatList
            data={filteredFoods}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                food={item}
                navigation={navigation}
              />//navigation={navigation} 
            )}
            showsVerticalScrollIndicator={false}
            className="px-2"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">Không tìm thấy món ăn</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between  px-5 py-3 bg-orange-500">
        <View className="flex-row items-center bg-white rounded px-2 py-1 flex-1 mr-2">
          <Ionicons name="search" size={20} color="#FF5722" />
          <TextInput
            placeholder="Tìm kiếm đồ ăn"
            placeholderTextColor="#FF5722"
            className="ml-2 text-base text-orange-500 font-bold flex-1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <CartQuantityButton
          quantity={cartItems.length}
          onPress={() => navigation.navigate("MyCart")}
        />
        <TouchableOpacity onPress={() => setShowFilterModal(true)} className="ml-2">
          <Ionicons name="options-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {renderContent()}

      {/* Có thể thêm FilterModal component ở đây */}
      {/* {showFilterModal && (
        <FilterModal isVisible={showFilterModal} onClose={() => setShowFilterModal(false)} />
      )} */}
    </View>
  );
};

export default Home;