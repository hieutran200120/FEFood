import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";

interface TextButtonProps {
    buttonContainerStyle?: any;
    label: string;
    labelStyle?: any;
    onPress: () => void;
    label2?: string;
    label2Style?: any;
    disabled?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
    buttonContainerStyle,
    label,
    labelStyle,
    onPress,
    label2 = "",
    label2Style,

}) => {
    return (
        <TouchableOpacity
            className={`flex items-center justify-center bg-primary ${buttonContainerStyle}`}
            style={{
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            onPress={onPress}
        >
            <Text
                className="text-white font-medium"
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {label2 !== "" && (
                <Text
                    className="flex-1 text-right text-white font-medium"
                    style={[
                        {
                            flex: 1,
                            textAlign: 'right',
                            color: COLORS.white,
                            ...FONTS.h3
                        },
                        label2Style
                    ]}
                >
                    {label2}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default TextButton;