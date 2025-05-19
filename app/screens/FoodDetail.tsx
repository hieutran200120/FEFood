import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { COLORS, SIZES } from '../constants';
import { BASE_URL, CartContextType, CartItem, NavigationProp } from '../types';
// Import components
import { CartQuantityButton, Header, LineDivider, Rating, StepperInput, TextButton } from '../components';
import images from '../constants/images';
// Import constants
import icons from '../constants/icons';

// Import services and context
import { CartContext } from '../context/CartContext';
import { getFood } from '../services/foodService';
import { getRating } from '../services/RatingService';
// Type definitions
interface RouteParams {
    id: string;
}
interface FoodDetailProps {
    navigation: NavigationProp;
}
interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
}

interface User {
    userName: string;
    avatar?: string;
}

interface RatingItem {
    id: string;
    user: User;
    star: number;
    comment: string;
    date: string;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ navigation }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [qty, setQty] = useState(1);
    const [foodDetail, setFoodDetail] = useState<FoodItem | null>(null);
    const [rating, setRating] = useState<RatingItem[]>([]);

    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { cartItems, addToCartItem } = useContext(CartContext) as CartContextType;
    const fetchFoodDetail = async () => {
        try {
            const data = await getFood({ id });
            if (data.items && data.items.length > 0) {
                setFoodDetail(data.items[0]);
            } else {
                setFoodDetail(null);
            }
        } catch (error) {
            console.error('Error fetching food detail:', error);
        }
    };

    const fetchRating = async () => {
        try {
            const data = await getRating({ "food_id": id });
            console.log(data)
            if (data.items && data.items.length > 0) {
                setRating(data.items);
            } else {
                setRating([]);
            }
        } catch (error) {
            console.error('Error fetching rating:', error);
        }
    }

    useEffect(() => {
        fetchFoodDetail();
        fetchRating();
    }, [id]);

    const renderHeader = () => {
        return (
            <Header
                title="Chi tiết"
                containerStyle="h-15 px-4 mt-5 items-center"
                leftComponent={
                    <View className="flex justify-center items-center">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-md border border-gray-200 flex items-center justify-center"
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={icons.back}
                                className="w-5 h-5"
                            />
                        </TouchableOpacity>
                    </View>
                }
                rightComponent={
                    <CartQuantityButton
                        quantity={cartItems.length}
                        onPress={() => navigation.navigate('MyCart')}
                    />
                }
            />
        );
    }

    const renderDetail = () => {
        return (
            <View className="mt-4 mb-4 px-4">
                {/* Food Card */}
                <View className="w-full h-64 bg-gray-100">
                    {foodDetail?.image && foodDetail.image.length > 0 ? (
                        <SwiperFlatList
                            autoplay
                            autoplayDelay={4}
                            autoplayLoop
                            index={0}
                            showPagination
                            paginationActiveColor="#F9813A"
                            paginationDefaultColor="gray"
                            paginationStyleItemActive={{
                                backgroundColor: "#F9813A",
                            }}
                            paginationStyleItemInactive={{
                                backgroundColor: "lightgray",
                            }}
                            paginationStyle={{
                                position: 'absolute',
                                bottom: 1,
                            }}
                            paginationStyleItem={{
                                width: 8,
                                height: 8,
                                marginHorizontal: 3,
                            }}
                            data={foodDetail.image}
                            renderItem={({ item }: any) => (
                                <View className="h-64 flex justify-center items-center">
                                    <Image
                                        source={{ uri: `${BASE_URL}/Images/${item}` }}
                                        className="w-full h-full object-cover"
                                        style={{ width: SIZES.width }}
                                    />
                                </View>
                            )}
                        />
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-gray-500">Không có hình ảnh</Text>
                        </View>
                    )}
                </View>

                {/* Food Info */}
                <View className="mb-4 mt-4">
                    <Text className="text-2xl font-bold mb-1">
                        {foodDetail?.name}
                    </Text>
                    <Text className="text-gray-600 text-base">
                        {foodDetail?.description}
                    </Text>
                </View>

                {/* IconLabel */}
                <View className="flex flex-row mb-4">
                    {/* Ratings */}
                    {/* <IconLabel
                        containerStyle={{
                            backgroundColor: COLORS.primary
                        }}
                        icon={icons.star}
                        label="4.5"
                        labelStyle={{
                            color: COLORS.white
                        }}
                    /> */}

                    {/* Duration */}
                    {/* <IconLabel
                        containerStyle={{
                            marginLeft: SIZES.radius,
                            paddingHorizontal: 0
                        }}
                        icon={icons.clock}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        label="30 Mins"
                    /> */}

                    {/* Shipping */}
                    {/* <IconLabel
                        containerStyle={{
                            marginLeft: SIZES.radius,
                            paddingHorizontal: 0
                        }}
                        icon={icons.dollar}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        label="Free Shipping"
                    /> */}
                </View>
            </View>
        );
    }

    const renderRestaurant = () => {
        return (
            <View className="flex flex-row my-4 px-4 items-center">
                <Image
                    source={images.profile}
                    className="w-12 h-12 rounded-lg"
                />
                <View className="flex-1 ml-3 flex flex-col justify-center">
                    <Text className="text-lg font-semibold">ByProgrammers</Text>
                    <Text className="text-gray-500 text-sm">12.2 KM away from you</Text>
                </View>
                {/* ratings */}
                <Rating
                    rating={4}
                    iconStyle={{
                        marginLeft: 3
                    }}
                />
            </View>
        );
    }

    const renderFooter = () => {
        return (
            <View className="flex flex-row h-24 items-center px-4">
                <StepperInput
                    value={qty}
                    onAdd={() => setQty(qty + 1)}
                    onMinus={() => {
                        if (qty > 1) {
                            setQty(qty - 1);
                        }
                    }}
                    containerStyle={{
                        height: 50,
                        width: 125,
                        backgroundColor: COLORS.white
                    }}
                />
                {/* Button */}
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 50,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: 5,
                        backgroundColor: COLORS.primary
                    }}
                    label="Mua ngay"
                    label2={new Intl.NumberFormat("vi-VN").format(foodDetail?.price ? foodDetail.price * qty : 0) + "₫"}
                    onPress={() => {
                        if (foodDetail) {
                            // Tạo một CartItem từ FoodItem bằng cách thêm trường quantity
                            const cartItem: CartItem = {
                                ...foodDetail,
                                quantity: qty
                            };
                            console.log(qty)
                            addToCartItem(cartItem, qty);
                            navigation.navigate("MyCart");
                        }
                    }}
                />
            </View>
        );
    }
    const renderComment = (review: RatingItem) => (
        <View className="p-3 border-b border-gray-200">
            <View className="flex flex-row items-center gap-3">
                {review.user.avatar ? (
                    <Image
                        source={{ uri: `http://192.168.9.110:45456/Images/${review.user.avatar}` }}
                        className="w-9 h-9 rounded-full"
                    />
                ) : (
                    <View className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white">
                        <Image
                            source={icons.favourite}
                            className="w-5 h-5"
                            style={{ tintColor: 'white' }}
                        />
                    </View>
                )}
                <Text className="font-bold">{review.user.userName}</Text>
            </View>
            <View className="ml-10">
                <Rating
                    rating={review.star}
                    iconStyle={{
                        marginLeft: 3
                    }}
                />
                <Text className="my-1">{review.comment}</Text>
                <Text className="text-xs text-gray-500">{review.date}</Text>
            </View>
        </View>
    );

    return (
        <View className="flex flex-col bg-white min-h-screen">
            {renderHeader()}
            {/* <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {renderDetail()}
                <LineDivider />
                <Text className="text-xl font-bold py-3 px-5 bg-gray-100 text-gray-800">
                    Bình luận
                </Text>
                <View className="comments-container">
                    {rating.length > 0 ? (
                        rating.map(item => renderComment(item))
                    ) : (
                        <View className="p-4 items-center">
                            <Text className="text-gray-500">Không có bình luận nào.</Text>
                        </View>
                    )}
                </View>
                {renderRestaurant()}
                <LineDivider />
                <View className="h-24" />
            </ScrollView> */}
            <FlatList
                className="flex-1"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        {renderDetail()}
                        <LineDivider />
                        <Text className="text-xl font-bold py-3 px-5 bg-gray-100 text-gray-800">
                            Bình luận
                        </Text>
                    </>
                )}
                data={rating.length > 0 ? rating : [{ empty: true } as any]}
                renderItem={({ item }: { item: any }) =>
                    item.empty ? (
                        <View className="p-4 items-center">
                            <Text className="text-gray-500">Không có bình luận nào.</Text>
                        </View>
                    ) : renderComment(item)
                }
                keyExtractor={(item: any, index: number) => item.id?.toString() || index.toString()}
                ListFooterComponent={() => (
                    <>
                        {renderRestaurant()}
                        <LineDivider />
                        <View className="h-24" />
                    </>
                )}
            />
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                {renderFooter()}
            </View>

        </View>
    );
};

export default FoodDetail;