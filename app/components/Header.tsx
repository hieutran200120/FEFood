import React from 'react';
import { Text, View } from 'react-native';

interface HeaderProps {
  containerClassName?: string;
  containerStyle?: string;
  title?: string;
  titleClassName?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  containerClassName,
  containerStyle,
  title,
  titleClassName,
  leftComponent,
  rightComponent
}) => {
  return (
    <View className={`h-16 flex-row ${containerClassName || ''} ${containerStyle || ''}`}>
      {leftComponent}
      <View className="flex-1 items-center justify-center">
        <Text className={`text-lg font-semibold ${titleClassName || ''}`}>
          {title}
        </Text>
      </View>
      {rightComponent}
    </View>
  );
};

export default Header;