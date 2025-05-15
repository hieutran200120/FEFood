import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants'; // Đảm bảo import SIZES nếu sử dụng

interface FormInputProps {
    containerStyle?: ViewStyle;
    label: string;
    value?: string;
    placeholder: string;
    inputStyle?: TextStyle;
    prependComponent?: React.ReactNode;
    appendComponent?: React.ReactNode;
    onChange: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoComplete?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' | 'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    errorMsg?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry = false, // Thêm giá trị mặc định
    keyboardType = "default",
    autoComplete = "off",
    autoCapitalize = "none",
    errorMsg = ""
}) => {
    return (
        <View style={containerStyle}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    color: COLORS.gray, ...FONTS.body4
                }}>
                    {label}
                </Text>
                {errorMsg ? (
                    <Text
                        style={{
                            color: COLORS.red, ...FONTS.body4
                        }}
                    >
                        {errorMsg}
                    </Text>
                ) : null}
            </View>
            {/* text input */}
            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    alignItems: 'center' // Thêm để căn giữa các thành phần
                }}
            >
                {prependComponent}
                <TextInput
                    style={{
                        flex: 1,
                        ...inputStyle
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry} // Thêm secureTextEntry
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
                    autoCapitalize={autoCapitalize}
                    onChangeText={onChange} // Sử dụng trực tiếp onChange
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;