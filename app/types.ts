import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  OnBoarding: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'home': undefined;
  'tabs': undefined;
  'MyCart': undefined;
  "FoodDetail": { id: string };
  "order": undefined,
  "MyCard": undefined,
  "Success": undefined,
  "Rating": { foodId: string },
  "ProfileScreen": undefined,
  "Address": undefined,
  "HelpCenterScreen": undefined,
  "PolicyScreen": undefined,
  "SettingsScreen": undefined,
  "AboutScreen": undefined,
  "AddAddress": undefined,
  "OrderDetails": undefined
};

export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
};

export type TabParamList = {
  home: undefined;
  profile: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const navigationTypes = {
  RootStackParamList: 'RootStackParamList',
  AuthStackParamList: 'AuthStackParamList',
  TabParamList: 'TabParamList',
  NavigationProp: 'NavigationProp',
  AuthNavigationProp: 'AuthNavigationProp'
} as const;

export default navigationTypes;
//interface cart
export interface CartItem {
  id: string | number;
  quantity: number;
  price?: number;
  image?: string[];
  [key: string]: any;
}
//interface food
export interface Food {
  id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  isFavorite: number;
  categoryName: string;
};
export interface Address {
  id: number | string;
  receiver: string;
  streetName: string;
  province: string;
  district: string;
  ward: string;
}
export interface CartContextType {
  cartItems: CartItem[];
  addToCartItem: (item: CartItem, quantity?: number) => Promise<void>;
  deleteCartItem: (id: string | number) => Promise<void>;
  totalPrice: string;
  increaseQuantity: (id: string | number) => Promise<void>;
  decreaseQuantity: (id: string | number) => Promise<void>;
  quantity: number;
  address: Address[];
  updateAddress: (newAddress: Address[]) => Promise<void>;
  clearCart: () => Promise<void>;
}