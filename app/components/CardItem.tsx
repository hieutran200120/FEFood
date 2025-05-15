import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants";
import icons from '../constants/icons';

interface CardItemProps {
    item: {
        id?: string | number;
        name: string;
        icon: ImageSourcePropType;
    };
    isSelected: boolean;
    onPress: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ item, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            className={`flex-row h-[100px] items-center mt-3 px-4 border-2 rounded-xl ${
                isSelected ? 'border-primary' : 'border-lightGray2'
            }`}
            onPress={onPress}
        >
            <View
                className="w-[60px] h-[45px] items-center justify-center border-2 rounded-xl border-lightGray2"
            >
                <Image
                    source={item.icon}
                    resizeMode="center"
                    className="w-[35px] h-[35px]"
                />
            </View>
            
            {/* name */}
            <Text
                className="flex-1 ml-3 font-semibold text-lg"
                style={FONTS.h3} // Keep FONTS if needed for specific styling
            >
                {item.name}
            </Text>
            
            {/* radio button */}
            <Image
                source={isSelected ? icons.check_on : icons.check_off}
                className="w-[25px] h-[25px]"
            />
        </TouchableOpacity>
    );
}

export default CardItem;