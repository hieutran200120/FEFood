import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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

// 👇 Type cho route
type RatingScreenRouteProp = RouteProp<RootStackParamList, 'Rating'>;

const Rating: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");

    const route = useRoute<RatingScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();

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
        <View className="flex-1 items-center bg-white p-5">
            <View className="w-full h-1/3 justify-center items-center relative">
                <ImageBackground
                    source={require("../../assets/Pattern.png")}
                    className="absolute w-full h-full"
                />
            </View>

            <View className="flex-1 justify-center items-center">
                <View className="bg-orange-600 w-16 h-16 rounded-full items-center justify-center mt-16">
                    <Ionicons name="checkmark-circle" size={40} color="white" />
                </View>
                <Text className="text-2xl font-bold mt-5">Thank You!</Text>
                <Text className="text-xl font-semibold mb-2">Order Completed</Text>
                <Text className="text-sm text-gray-500 mb-5">Please rate your last Driver</Text>

                <View className="flex-row mb-5">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity key={index} onPress={() => handleRating(index)}>
                            <FontAwesome
                                name="star"
                                size={30}
                                color={index <= rating ? "#FFA500" : "#E0E0E0"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TextInput
                style={{ width: "90%" }}
                className="h-12 border border-gray-300 rounded-lg px-4 mb-10"
                placeholder="Leave feedback"
                value={feedback}
                onChangeText={setFeedback}
            />

            <View className="flex-row justify-between w-full px-5">
                <TouchableOpacity
                    className="bg-orange-600 rounded px-5 py-3"
                    onPress={submitRating}
                >
                    <Text className="text-white text-sm">Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text className="text-orange-600 text-sm ml-5">Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Rating;
