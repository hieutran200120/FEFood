export interface OnboardingScreen {
    id: number;
    backgroundImage: any;
    bannerImage: any;
    title: string;
    description: string;
}

export interface Screen {
    main_layout: string;
    home: string;
    search: string;
    cart: string;
    favourite: string;
    notification: string;
    my_wallet: string;
}

export interface BottomTab {
    id: number;
    label: string;
}

export interface DeliveryTime {
    id: number;
    label: string;
}

export interface Rating {
    id: number;
    label: number;
}

export interface Tag {
    id: number;
    label: string;
}

export interface TrackOrderStatus {
    id: number;
    title: string;
    sub_title: string;
}

export interface FontStyle {
    fontSize: number;
    lineHeight: number;
}

export interface Colors {
    primary: string;
    transparentPrimary: string;
    orange: string;
    lightOrange: string;
    lightOrange2: string;
    lightOrange3: string;
    green: string;
    red: string;
    red2: string;
    blue: string;
    darkBlue: string;
    darkGreen: string;
    darkRed: string;
    darkGray: string;
    gray: string;
    lightGray1: string;
    lightGray2: string;
    lightGray3: string;
    lightGray4: string;
    white: string;
    black: string;
    transparent: string;
    transparentBlack1: string;
    transparentBlack2: string;
    transparentBlack3: string;
    transparentBlack4: string;
    transparentBlack5: string;
    transparentBlack6: string;
    transparentBlack7: string;
}

export interface Fonts {
    body3: FontStyle;
    body4: FontStyle;
    h1: FontStyle;
    h2: FontStyle;
    h3: FontStyle;
    h4: FontStyle;
    h5: FontStyle;
}

export interface Sizes {
    base: number;
    font: number;
    radius: number;
    padding: number;
    margin: number;
    body3: number;
}

export interface Icons {
    correct: any;
    cancel: any;
    eye: any;
    eye_close: any;
}

declare const onboarding_screens: OnboardingScreen[];
declare const screens: Screen;
declare const bottom_tabs: BottomTab[];
declare const delivery_time: DeliveryTime[];
declare const ratings: Rating[];
declare const tags: Tag[];
declare const track_order_status: TrackOrderStatus[];
declare const GOOGLE_MAP_API_KEY: string;
declare const COLORS: Colors;
declare const FONTS: Fonts;
declare const SIZES: Sizes;
declare const icons: Icons;

export {
    bottom_tabs, COLORS, delivery_time, FONTS, GOOGLE_MAP_API_KEY, icons, onboarding_screens, ratings, screens, SIZES, tags,
    track_order_status
};

