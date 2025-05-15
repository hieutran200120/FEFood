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
import { register } from '../services/authService';
import { NavigationProp } from '../types';
import AuthLayout from './AuthLayout';
interface SignUpProps {
    navigation: NavigationProp;
}


const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const router = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [userName, setUserName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [userNameError, setUserNameError] = React.useState<string>("");
    const [phoneError, setPhoneError] = React.useState<string>("");
    const [showPass, setShowPass] = React.useState<boolean>(false);

    function isEnabledSignIn(): boolean {
        return email !== "" && password !== "" && emailError === "";
    }

    const handleSave = async (): Promise<void> => {
        const formData = new FormData();
        formData.append("UserName", userName);
        formData.append("Email", email);
        formData.append("Password", password);
        formData.append("PhoneNumber", phone);
        console.log("Dữ liệu gửi đi:", formData);
        try {
            const response = await register(formData);
            if (response) {
                console.log("Lưu thành công!");
                Toast.show({
                    type: "success",
                    text1: "Đăng ký thành công!",
                    text2: `Chào mừng, ${userName}!`,
                    position: "bottom",
                    visibilityTime: 2000,
                });
                navigation.navigate("sign-in");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            Toast.show({
                type: "error",
                text1: "Đăng ký thất bại!",
                text2: "Có lỗi xảy ra, vui lòng thử lại!",
                position: "bottom",
                visibilityTime: 2000,
            });
        }
    };

    return (
        <AuthLayout
            title="Bắt đầu"
            subtitle="Tạo tài khoản để tiếp tục!"
            titleContainerStyle={{
                marginTop: SIZES.radius
            }}
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
                    label="UserName"
                    placeholder="Nhập tên người dùng"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value: string) => {
                        setUserName(value)
                    }}
                    errorMsg={userNameError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={userName === "" || (userName !== "" && userNameError === "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: userName === "" ? COLORS.gray : (userName !== "" && userNameError === "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
                <FormInput
                    label="Phone"
                    placeholder="Nhập số điện thoại"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value: string) => {
                        setPhone(value)
                    }}
                    errorMsg={phoneError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={phone === "" || (phone !== "" && phoneError === "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: phone === "" ? COLORS.gray : (phone !== "" && phoneError === "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
                <FormInput
                    label="Password"
                    placeholder="Nhập mật khẩu"
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
                    label="Đăng ký"
                    disabled={!isEnabledSignIn()}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnabledSignIn() ? COLORS.primary : COLORS.transparentPrimary
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
                            ...FONTS.body3
                        }}
                    >
                        Bạn đã có tài khoản?
                    </Text>
                    <TextButton
                        label="Đăng nhập"
                        buttonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: 'transparent'
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.navigate('sign-in')}
                    />
                </View>
            </View>
        </AuthLayout>
    );
};

export default SignUp;