import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from "../constants";
import icons from '../constants/icons';
import IconButton from './IconButton';

interface StepperInputProps {
  containerStyle?: any;
  value?: number;
  onAdd?: () => void;
  onMinus?: () => void;
}

const StepperInput: React.FC<StepperInputProps> = ({
  containerStyle,
  value = 1,
  onAdd,
  onMinus
}) => {
  return (
    <View
      className="flex flex-row h-12 w-32 bg-gray-200 rounded-lg"
      style={{
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        ...containerStyle
      }}
    >
      <IconButton
        containerStyle={{
          width: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        icon={icons.minus}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray
        }}
        onPress={onMinus}
      />

      <View className="flex-1 flex items-center justify-center">
        <Text
          style={{
            ...FONTS.h2
          }}
        >
          {value}
        </Text>
      </View>

      <IconButton
        containerStyle={{
          width: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        icon={icons.plus}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: COLORS.primary
        }}
        onPress={onAdd}
      />
    </View>
  );
};

export default StepperInput;