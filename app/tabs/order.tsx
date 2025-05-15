import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CartContext } from "../context/CartContext";
import { changeStatus, getOrder } from "../services/orderService";
import { CartContextType, NavigationProp } from '../types';
interface OrderItemType {
  id: string;
  shopName?: string;
  orderItem: {
    id: string;
    status: number;
    price: number;
    quantity: number;
    food_id: number;
  };
  orderItems: {
    name: string;
    image: string[];
  };
  order: {
    createdAt: string;
  };
}

const tabs = ["Chờ xác nhận", "Chờ lấy hàng", "Chờ giao hàng", "Đã giao", "Đã hủy"];

interface OrderProps {
  navigation: NavigationProp;
}

const Order: React.FC<OrderProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Chờ xác nhận");
  const { cartItems } = useContext(CartContext) as CartContextType;
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderItemType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const loadUserAndFetchOrders = async () => {
      try {
        // Lấy thông tin người dùng từ AsyncStorage
        const userJson = await AsyncStorage.getItem('info');
        if (!userJson) return;
        const userData = JSON.parse(userJson);
        const id = userData.user_id;
        console.log('✅ user_id:', id);
        setUserId(id);
        const data = await getOrder({ "user_id": id });
        setOrders(data.items);
      } catch (error) {
        console.error("Error loading user or fetching orders:", error);
      }
    };

    loadUserAndFetchOrders();
  }, []);

  // Tách hàm fetchOrder ra để tái sử dụng
  const fetchOrder = useCallback(async () => {
    if (!userId) return;

    try {
      const data = await getOrder({ "user_id": userId });
      setOrders(data.items);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }, [userId]);

  // Sử dụng useCallback để tránh tạo lại hàm mỗi lần render
  const handleChangeStatus = useCallback(async (orderItemId: string, newStatus: number) => {
    try {
      const res = await changeStatus(orderItemId, { status: newStatus });
      if (res) await fetchOrder();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  }, [fetchOrder]);

  const getFilteredOrders = () => {
    const statusMap: Record<string, number> = {
      "Chờ xác nhận": 1,
      "Chờ lấy hàng": 2,
      "Chờ giao hàng": 3,
      "Đã giao": 4,
      "Đã hủy": 0,
    };

    let filtered = orders.filter(order => order.orderItem.status === statusMap[selectedTab]);

    // Apply search filter if search query exists
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(order =>
        order.orderItems.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.shopName && order.shopName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply date filter if date is selected
    if (selectedDate) {
      const selectedDateStr = selectedDate.toDateString();
      filtered = filtered.filter(order => {
        if (!order.order?.createdAt) return false;
        const orderDate = new Date(order.order.createdAt).toDateString();
        return orderDate === selectedDateStr;
      });
    }

    return filtered;
  };

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Apply filters whenever search query, selected date, or tab changes
  useEffect(() => {
    setFilteredOrders(getFilteredOrders());
  }, [searchQuery, selectedDate, selectedTab, orders]);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDate(null);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white px-5 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-bold">Đơn hàng</Text>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name={showSearch ? "close" : "search"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="ml-4">
            <Ionicons name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {showSearch && (
          <View className="mt-3">
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-2"
              placeholder="Tìm kiếm theo tên..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        {selectedDate && (
          <View className="flex-row items-center mt-2">
            <Text className="text-sm">Ngày đã chọn: {selectedDate.toLocaleDateString('vi-VN')}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(null)} className="ml-2">
              <Ionicons name="close-circle" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        )}

        {(searchQuery || selectedDate) && (
          <TouchableOpacity
            onPress={clearFilters}
            className="bg-gray-200 self-start rounded-lg px-3 py-1 mt-2"
          >
            <Text className="text-sm">Xóa bộ lọc</Text>
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View className="bg-white border-b border-gray-200 h-12">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ height: 48 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`flex-1 justify-center items-center px-5 h-full ${selectedTab === tab ? "border-b-2 border-orange-500" : ""}`}
            >
              <Text
                className={`text-sm ${selectedTab === tab ? "text-orange-500 font-bold" : "text-gray-600"}`}
                style={{ lineHeight: 16 }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={getFilteredOrders()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            onChangeStatus={handleChangeStatus}
            navigation={navigation}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Image source={require("../../assets/order.png")} className="w-28 h-28 mb-3" />
            <Text className="text-base text-black">
              {searchQuery || selectedDate
                ? "Không tìm thấy đơn hàng phù hợp"
                : "Bạn chưa có đơn hàng nào cả"}
            </Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

interface OrderCardProps {
  item: OrderItemType;
  onChangeStatus: (orderItemId: string, newStatus: number) => void;
  navigation: NavigationProp;
}

const OrderCard: React.FC<OrderCardProps> = ({ item, onChangeStatus, navigation }) => {
  const { addToCartItem } = useContext(CartContext) as CartContextType;

  const getOrderStatus = (status: number) => {
    const statusMap: Record<number, string> = {
      1: "Chờ xác nhận",
      2: "Chờ lấy hàng",
      3: "Chờ giao hàng",
      4: "Đã giao",
      0: "Đã hủy",
    };
    return statusMap[status] || "Không xác định";
  };

  const handleOrderAction = async () => {
    const status = item.orderItem.status;
    if (status === 2) {
      await onChangeStatus(item.id, status + 1);
      console.log(item.orderItem);
    } else if (status === 1) {
      await onChangeStatus(item.id, 0);
    }
    else if (status === 3) {
      await onChangeStatus(item.id, 4);
      navigation.navigate("Rating", { foodId: item.orderItem.food_id.toString() });
    } else {
      // Mua lại - Thêm vào giỏ hàng
      handleAddToCart();
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    try {
      // Tạo đối tượng sản phẩm từ thông tin đơn hàng
      const productToAdd = {
        id: item.orderItem.food_id.toString(),
        name: item.orderItems.name,
        price: item.orderItem.price,
        image: item.orderItems.image,
        quantity: item.orderItem.quantity
      };

      // Thêm vào giỏ hàng
      addToCartItem(productToAdd);

      // Hiển thị thông báo thành công
      Alert.alert(
        "Thành công",
        "Đã thêm sản phẩm vào giỏ hàng",
        [{ text: "OK", onPress: () => navigation.navigate("MyCart") }]
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng");
    }
  };

  const handleOrderDetailAction = async () => {
    navigation.navigate("OrderDetails");
  };

  return (
    <View className="bg-white rounded-xl shadow-sm mx-4 my-2 p-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-base font-semibold">{item.shopName || "Tên cửa hàng"}</Text>
        <Text className="text-sm text-red-500">{getOrderStatus(item.orderItem.status)}</Text>
      </View>

      <View className="flex-row items-center mb-2">
        <Image
          source={{ uri: `http://192.168.9.110:45455/Images/${item.orderItems.image[0]}` }}
          className="w-14 h-14 rounded-md mr-3"
        />
        <View className="flex-1">
          <Text className="font-semibold">{item.orderItems.name}</Text>
          <Text className="text-sm text-gray-500">
            {item.order?.createdAt
              ? new Date(item.order.createdAt).toLocaleDateString("vi-VN")
              : "Không có ngày"}
          </Text>
          <Text className="text-sm font-semibold mt-1 text-black">
            {new Intl.NumberFormat("vi-VN").format(item.orderItem.price)}₫
          </Text>
        </View>
      </View>

      <Text className="text-sm font-semibold text-black">
        Tổng số tiền ({item.orderItem.quantity} sản phẩm):{" "}
        {new Intl.NumberFormat("vi-VN").format(item.orderItem.price * item.orderItem.quantity)}₫
      </Text>

      <View className="flex-row justify-between mt-3">
        <TouchableOpacity className="border border-gray-300 rounded px-3 py-2" onPress={handleOrderDetailAction}>
          <Text className="text-sm text-gray-700">Xem Chi tiết đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 rounded px-3 py-2" onPress={handleOrderAction}>
          <Text className="text-sm text-white">
            {item.orderItem.status === 2
              ? "Xác nhận"
              : item.orderItem.status === 1
                ? "Huỷ đơn"
                : item.orderItem.status === 3
                  ? "Đã giao hàng"
                  : "Mua lại"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;