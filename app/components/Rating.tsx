import React from 'react';
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { COLORS } from "../constants";
import icons from "../constants/icons";

interface RatingProps {
    rating: number;
    iconStyle?: StyleProp<ImageStyle>;
    activeColor?: string;
    inactiveColor?: string;
}

const Rating: React.FC<RatingProps> = ({
    rating,
    iconStyle,
    activeColor = COLORS.orange,
    inactiveColor = COLORS.lightOrange3
}) => {
    // Create an array of 5 elements to render stars
    const stars = Array(5).fill(0);

    return (
        <View className="flex-row">
            {stars.map((_, index) => (
                <Image
                    key={`star-${index}`}
                    source={icons.star}
                    style={[
                        {
                            tintColor: rating >= index + 1 ? activeColor : inactiveColor,
                            height: 15,
                            width: 15
                        },
                        iconStyle
                    ]}
                />
            ))}
        </View>
    );
};

export default Rating;