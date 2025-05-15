import React from 'react';
import { View } from 'react-native';
import { COLORS } from "../constants";

interface LineDividerProps {
  lineStyle?: any;
}

const LineDivider: React.FC<LineDividerProps> = ({ lineStyle }) => {
  return (
    <View
      className="h-0.5 w-full bg-gray-200"
      style={{
        backgroundColor: COLORS.lightGray2,
        ...lineStyle
      }}
    />
  );
};

export default LineDivider;