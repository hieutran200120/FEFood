const onboarding_screens = [
    {
        id: 1,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/favourite_food.png"),
        title: "Chọn món ăn yêu thích",
        description: "Khi bạn đặt hàng Eat Steet, chúng tôi sẽ cung cấp cho bạn phiếu giảm giá, ưu đãi và phần thưởng độc quyền"
    },
    {
        id: 2,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/hot_delivery.png"),
        title: "Giao hàng tận nhà nóng hổi",
        description: "Chúng tôi giúp việc đặt đồ ăn trở nên nhanh chóng, đơn giản và miễn phí - bất kể bạn đặt hàng trực tuyến hay trả tiền mặt"
    },
    {
        id: 3,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/great_food.png"),
        title: "Nhận được món ăn tuyệt vời",
        description: "Bạn sẽ nhận được đồ ăn tuyệt vời trong vòng một giờ. Và nhận được tín dụng giao hàng miễn phí cho mọi đơn hàng."
    }
]

const screens = {
    main_layout: "MainLayout",
    home: "Home",
    search: "Search",
    cart: "Cart",
    favourite: "Favourite",
    notification: "Notification",
    my_wallet: "My Wallet",
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.search,
    },
    {
        id: 2,
        label: screens.cart,
    },
    {
        id: 3,
        label: screens.favourite,
    },
    {
        id: 4,
        label: screens.notification,
    },
]

const delivery_time = [
    {
        id: 1,
        label: "10 Mins",
    },
    {
        id: 2,
        label: "20 Mins"
    },
    {
        id: 3,
        label: "30 Mins"
    }
]

const ratings = [
    {
        id: 1,
        label: 1,
    },
    {
        id: 2,
        label: 2,
    },
    {
        id: 3,
        label: 3,
    },
    {
        id: 4,
        label: 4,
    },
    {
        id: 5,
        label: 5,
    }
]

const tags = [
    {
        id: 1,
        label: "Burger"
    },
    {
        id: 2,
        label: "Fast Food"
    },
    {
        id: 3,
        label: "Pizza"
    },
    {
        id: 4,
        label: "Asian"
    },
    {
        id: 5,
        label: "Dessert"
    },
    {
        id: 6,
        label: "Breakfast"
    },
    {
        id: 7,
        label: "Vegetable"
    },
    {
        id: 8,
        label: "Taccos"
    }
]

const track_order_status = [
    {
        id: 1,
        title: "Order Confirmed",
        sub_title: "Your order has been received"
    },
    {
        id: 2,
        title: "Order Prepared",
        sub_title: "Your order has been prepared"
    },
    {
        id: 3,
        title: "Delivery in Progress",
        sub_title: "Hang on! Your food is on the way"
    },
    {
        id: 4,
        title: "Delivered",
        sub_title: "Enjoy your meal!"
    },
    {
        id: 5,
        title: "Rate Us",
        sub_title: "Help us improve our service"
    }
]

const GOOGLE_MAP_API_KEY = ""

export const COLORS = {
    primary: '#FF6B6B',
    transparentPrimary: 'rgba(255, 107, 107, 0.1)',
    orange: '#FFA500',
    lightOrange: '#FFB74D',
    lightOrange2: '#FFCC80',
    lightOrange3: '#FFE0B2',
    green: '#4CAF50',
    red: '#F44336',
    red2: '#FF5252',
    blue: '#2196F3',
    darkBlue: '#1976D2',
    darkGreen: '#388E3C',
    darkRed: '#D32F2F',
    darkGray: '#424242',
    gray: '#757575',
    lightGray1: '#F5F5F5',
    lightGray2: '#EEEEEE',
    lightGray3: '#E0E0E0',
    lightGray4: '#BDBDBD',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    transparentBlack1: 'rgba(0, 0, 0, 0.1)',
    transparentBlack2: 'rgba(0, 0, 0, 0.2)',
    transparentBlack3: 'rgba(0, 0, 0, 0.3)',
    transparentBlack4: 'rgba(0, 0, 0, 0.4)',
    transparentBlack5: 'rgba(0, 0, 0, 0.5)',
    transparentBlack6: 'rgba(0, 0, 0, 0.6)',
    transparentBlack7: 'rgba(0, 0, 0, 0.7)'
};

export const FONTS = {
    body3: {
        fontSize: 14,
        lineHeight: 20
    },
    body4: {
        fontSize: 12,
        lineHeight: 18
    },
    h1: {
        fontSize: 32,
        lineHeight: 40
    },
    h2: {
        fontSize: 24,
        lineHeight: 32
    },
    h3: {
        fontSize: 20,
        lineHeight: 28
    },
    h4: {
        fontSize: 18,
        lineHeight: 26
    },
    h5: {
        fontSize: 16,
        lineHeight: 24
    }
};

export const SIZES = {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    margin: 20,
    body3: 14
};

export const icons = {
    correct: require('../../assets/icons/correct.png'),
    cancel: require('../../assets/icons/cancel.png'),
    eye: require('../../assets/icons/eye.png'),
    eye_close: require('../../assets/icons/eye_close.png')
};

export default {
    onboarding_screens,
    screens,
    bottom_tabs,
    delivery_time,
    ratings,
    tags,
    track_order_status,
    GOOGLE_MAP_API_KEY,
}