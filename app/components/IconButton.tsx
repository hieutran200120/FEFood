import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface IconButtonProps {
  containerStyle?: any; // thay vì string | React.CSSProperties
  icon: any;
  iconStyle?: any; // thay vì React.CSSProperties
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress
}) => {
  const isStringStyle = typeof containerStyle === 'string';

  return (
    <TouchableOpacity
      style={[
        { alignItems: 'center', justifyContent: 'center' },
        !isStringStyle ? containerStyle : {}
      ]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[{ width: 32, height: 32 }, iconStyle]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;