import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from "react-native-toast-message";
import FormInput from '../components/FormInput';
import TextButton from '../components/TextButton';
import { COLORS, FONTS, SIZES } from '../constants';
import icons from '../constants/icons';
import { login } from '../services/authService';
import { NavigationProp } from '../types';
import AuthLayout from './AuthLayout';

interface SignInProps {
    navigation: NavigationProp;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const router = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [showPass, setShowPass] = React.useState<boolean>(false);
    function isEnabledSignIn(): boolean {
        return email !== "" && password !== "" && emailError === "";
    }

    const handleSave = async (): Promise<void> => {
        try {
            await login(email, password);
            await Toast.show({
                type: "success",
                text1: "Đăng nhập thành công!",
                position: "bottom",
                visibilityTime: 2000,
            });

            await navigation.navigate('tabs');

        } catch (error) {
            const apiError = error as ApiError;
            Toast.show({
                type: "error",
                text1: "Đăng nhập thất bại!",
                text2: apiError.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!",
                position: "bottom",
                visibilityTime: 2000,
            });
        }
    };

    return (
        <AuthLayout
            title="Hãy Đăng Nhập"
            subtitle="Chào mừng bạn trở lại"
        >
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2
                }}
            >
                <FormInput
                    label="Email"
                    placeholder="Nhập email của bạn"
                    keyboardType='email-address'
                    autoComplete='email'
                    onChange={(value: string) => {
                        setEmail(value)
                    }}
                    errorMsg={emailError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={email === "" || (email !== "" && emailError === "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: email === "" ? COLORS.gray : (email !== "" && emailError === "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
                <FormInput
                    label="Password"
                    placeholder="Nhập mật khẩu của bạn"
                    secureTextEntry={!showPass}
                    autoComplete="password"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value: string) => setPassword(value)}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Image
                                source={showPass ? icons.eye_close : icons.eye}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />
                <TextButton
                    label="Đăng nhập"
                    disabled={!isEnabledSignIn()}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnabledSignIn() ? COLORS.primary : COLORS.transparentPrimary
                    }}
                    labelStyle={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                    onPress={handleSave}
                />
                {/* sign up */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.body3,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.h3
                        }}
                    >
                        Bạn chưa có tài khoản?
                    </Text>
                    <TextButton
                        label="Đăng ký"
                        buttonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: 'transparent'
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.navigate('sign-up')}
                    />
                </View>
            </View>
        </AuthLayout>
    );
};

export default SignIn;