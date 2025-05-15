import { useRouter } from 'expo-router';
import React from 'react';
import {
    Animated,
    FlatList,
    Image,
    ImageBackground,
    Text,
    View
} from 'react-native';
import TextButton from '../components/TextButton';
import { COLORS, FONTS, SIZES } from '../constants';
import constants from '../constants/constants';
import { images } from '../constants/images';
import { NavigationProp } from '../types';

interface OnBoardingItem {
    id: number;
    title: string;
    description: string;
    backgroundImage: any;
    bannerImage: any;
}

interface OnBoardingProps {
    navigation: NavigationProp;
}

const OnBoarding: React.FC<OnBoardingProps> = ({ navigation }) => {
    const router = useRouter();
    const flatListRef = React.useRef<FlatList<OnBoardingItem>>(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const Dots: React.FC = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {constants.onboarding_screens.map((item: OnBoardingItem, index: number) => {
                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.lightOrange, COLORS.primary, COLORS.lightOrange],
                        extrapolate: "clamp"
                    });
                    const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [10, 30, 10],
                        extrapolate: "clamp"
                    });
                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            style={{
                                borderRadius: 5,
                                marginHorizontal: 6,
                                width: dotWidth,
                                height: 10,
                                backgroundColor: dotColor,
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    const renderHeaderLogo = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                }}
            >
                <Image
                    source={images.logo_02}
                    resizeMode='contain'
                    style={{
                        width: SIZES.width * 0.5,
                        height: 100
                    }}
                />
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View
                style={{
                    height: 160
                }}
            >
                {/* Panigation/Dot */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <Dots />
                </View>
                {/* Button */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: SIZES.padding,
                        marginVertical: SIZES.padding,
                    }}
                >
                    {currentIndex > constants.onboarding_screens.length - 1 ? (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TextButton
                                label="Đăng nhập"
                                disabled={false}
                                buttonContainerStyle={{
                                    height: 55,
                                    alignItems: 'center',
                                    marginTop: SIZES.padding,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary,
                                    width: '100%'
                                }}
                                labelStyle={{ color: COLORS.white }}
                                onPress={() => navigation.navigate('sign-in')}
                            />
                        </View>
                    ) : (
                        <>
                            <TextButton
                                label="Skip"
                                buttonContainerStyle={{ backgroundColor: "transparent" }}
                                labelStyle={{ color: COLORS.darkGray2 }}
                                onPress={() => navigation.navigate('sign-in')}
                            />

                            <TextButton
                                label="Next"
                                buttonContainerStyle={{
                                    height: 60,
                                    width: 200,
                                    borderRadius: SIZES.radius,
                                }}
                                onPress={() => {
                                    if (currentIndex < constants.onboarding_screens.length - 1) {
                                        // Scroll to the next item
                                        flatListRef.current?.scrollToIndex({
                                            index: currentIndex + 1,
                                            animated: true,
                                        });
                                    } else {
                                        // Khi ở slide cuối và nhấn Next
                                        setCurrentIndex(currentIndex + 1);
                                    }
                                }}
                            />
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeaderLogo()}
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
                    setCurrentIndex(newIndex);
                }}
                keyExtractor={(item: OnBoardingItem) => `${item.id}`}
                renderItem={({ item, index }: { item: OnBoardingItem; index: number }) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width
                            }}>
                            <View style={{ flex: 3 }}>
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width * 0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: -SIZES.padding
                                        }}
                                    />
                                </ImageBackground>
                            </View>
                            {/* Detail */}
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: SIZES.radius,
                                }}
                            >
                                {/* Tiêu đề */}
                                <Text style={{ ...FONTS.h1, fontSize: 25 }}>{item.title}</Text>

                                {/* Mô tả */}
                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        color: COLORS.darkGray,
                                        paddingHorizontal: SIZES.padding,
                                        ...FONTS.body3,
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />
            {renderFooter()}
        </View>
    );
};

export default OnBoarding;