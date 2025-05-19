import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { postRating } from "../services/RatingService";
import { NavigationProp, RootStackParamList } from '../types';
const { width, height } = Dimensions.get("window");
interface RatingProps {
    navigation: NavigationProp;
}
// Type cho route
type RatingScreenRouteProp = RouteProp<RootStackParamList, 'Rating'>;

const Rating: React.FC<RatingProps> = ({ navigation }) => {
    const [rating, setRating] = useState<number>(3);
    const [feedback, setFeedback] = useState<string>("");

    const route = useRoute<RatingScreenRouteProp>();
    // const navigation = useNavigation<NavigationProp>();

    const { foodId } = route.params;

    const handleRating = (index: number) => {
        setRating(index);
    };

    const getUserId = async (): Promise<string | null> => {
        try {
            const user = await AsyncStorage.getItem('user');
            return user;
        } catch (error) {
            console.error("❌ Lỗi khi lấy user:", error);
            return null;
        }
    };

    const submitRating = async () => {
        const userId = await getUserId();
        try {
            const ratingData = {
                star: rating,
                comment: feedback,
                food_id: foodId,
                user_id: userId || "",
            };
            console.log(ratingData)
            const response = await postRating(ratingData);
            navigation.navigate("tabs");
        } catch (error) {
            console.error('❌ Lỗi khi submit:', error);
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Background Pattern */}
            <View className="h-1/3 w-full">
                <ImageBackground
                    source={require("../../assets/Pattern.png")}
                    className="w-full h-full"
                />
            </View>

            {/* Content Container */}
            <View className="flex-1 items-center px-5">
                {/* Check Circle */}
                <View className="w-16 h-16 rounded-full bg-red-500 justify-center items-center -mt-8 mb-6">
                    <Ionicons name="checkmark" size={24} color="white" />
                </View>

                {/* Text Content */}
                <Text className="text-2xl font-bold text-black mb-2">Cảm ơn!</Text>
                <Text className="text-lg font-semibold text-black mb-4">Đặt hàng thành công</Text>
                <Text className="text-sm text-gray-500 mb-6">Làm ơn đánh giá sản phẩm</Text>

                {/* Stars */}
                <View className="flex-row mb-10">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity key={index} onPress={() => handleRating(index)} className="mx-2">
                            <FontAwesome
                                name="star"
                                size={30}
                                color={index <= rating ? "#FFC107" : "#F8F8F8"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Feedback Input */}
                <View className="w-full flex-row items-center border-b border-gray-200 pb-3 mb-10">
                    <FontAwesome name="pencil" size={18} color="#FF4B3A" className="mr-3" />
                    <TextInput
                        className="flex-1 text-base text-black"
                        placeholder="Leave feedback"
                        value={feedback}
                        onChangeText={setFeedback}
                        placeholderTextColor="#BDBDBD"
                    />
                </View>
            </View>

            {/* Buttons */}
            <View className="flex-row w-full px-5 pb-10">
                <TouchableOpacity
                    className="flex-3 bg-red-500 py-4 rounded-xl items-center justify-center mr-4"
                    style={{ flex: 3 }}
                    onPress={submitRating}
                >
                    <Text className="text-white font-semibold text-base">Gửi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 items-center justify-center"
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate("tabs")}
                >
                    <Text className="text-red-500 font-medium text-base">Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Rating;