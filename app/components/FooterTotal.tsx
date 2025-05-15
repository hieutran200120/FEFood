import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LineDivider, TextButton } from '../components';
import { COLORS, FONTS, SIZES } from '../constants';

interface FooterTotalProps {
  subTotal: number;
  shippingFee: number;
  total: number;
  onPress: () => void;
}

const FooterTotal: React.FC<FooterTotalProps> = ({
  subTotal,
  shippingFee,
  total,
  onPress
}) => {
  return (
    <View className="relative">
      {/* Shadow/Gradient */}
      <LinearGradient
        colors={[COLORS.transparent, COLORS.lightGray1]}
        className="absolute -top-4 left-0 right-0 h-4"
        style={{
          borderTopLeftRadius: '50%',
          borderTopRightRadius: 25,
        }}
      />

      {/* Order Detail */}
      <View
        className="p-4 rounded-t-3xl bg-white"
        style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.white
        }}
      >
        {/* Subtotal */}
        <View className="flex flex-row justify-between items-center">
          <Text className="text-base">
            Tổng cộng
          </Text>
          <Text className="text-base font-bold">
            {new Intl.NumberFormat("vi-VN").format(subTotal) + "₫"}
          </Text>
        </View>

        {/* Shipping Fee */}
        <View
          className="flex flex-row justify-between items-center mt-2"
          style={{
            marginTop: SIZES.base
          }}
        >
          <Text style={{ ...FONTS.body3 }}>
            Shipping Fee
          </Text>
          <Text style={{ ...FONTS.h3 }}>
            {new Intl.NumberFormat("vi-VN").format(shippingFee) + "₫"}
          </Text>
        </View>

        {/* Line Divider */}
        <LineDivider
          lineStyle={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding
          }}
        />

        {/* Total */}
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold" style={{ color: '#ee4d2d' }}>
            Tổng cộng
          </Text>
          <Text className="text-lg font-bold" style={{ color: '#ee4d2d' }}>
            {new Intl.NumberFormat("vi-VN").format(total) + "₫"}
          </Text>
        </View>

        {/* Order Button */}
        <TextButton
          buttonContainerStyle={{
            height: 50,
            backgroundColor: "#ee4d2d",
            padding: 15,
            borderRadius: 5,
            display: 'flex',
            alignItems: "center"
          }}
          label="Thanh toán"
          labelStyle={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold"
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default FooterTotal;