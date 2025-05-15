import { FONTS, SIZES } from "../constants";
import React from 'react';
import { View, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';

interface IconLabelProps {
  containerStyle?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const IconLabel: React.FC<IconLabelProps> = ({ 
  containerStyle, 
  icon, 
  iconStyle, 
  label, 
  labelStyle 
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        ...(containerStyle as object)
      }}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          ...(iconStyle as object)
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          ...FONTS.body3,
          ...(labelStyle as object)
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default IconLabel;