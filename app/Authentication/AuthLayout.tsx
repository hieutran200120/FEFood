import React from 'react';
import { Image, Text, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, FONTS, SIZES } from "../constants";
import { images } from "../constants/images";
interface AuthLayoutProps {
    title: string;
    subtitle: string;
    titleContainerStyle?: ViewStyle;
    children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, titleContainerStyle, children }: AuthLayoutProps) {
    return (

            <View
                style={{
                    flex: 1,
                    paddingVertical: SIZES.padding,
                    backgroundColor: COLORS.white,
                }}
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: SIZES.padding
                    }}
                    keyboardDismissMode="on-drag"
                >
                    {/* App Icon */}
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={images.logo_02}
                            resizeMode='contain'
                            style={{
                                height: 100,
                                width: 200,
                            }}
                        />
                    </View>
                    {/* Title & Subtitle */}
                    <View
                        style={{
                            marginTop: SIZES.padding,
                            ...titleContainerStyle
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                ...FONTS.h2
                            }}
                        >
                            {title}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: COLORS.darkGray,
                                marginTop: SIZES.base,
                                ...FONTS.body3
                            }}
                        >
                            {subtitle}
                        </Text>
                    </View>
                    {/* Content / Children */}
                    {children}
                </KeyboardAwareScrollView>
            </View>
        );
}
