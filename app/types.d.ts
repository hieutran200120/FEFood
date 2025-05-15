declare module "expo-router" {
    export function useRouter(): {
        push: (path: string) => void;
        replace: (path: string) => void;
        back: () => void;
        canGoBack: () => boolean;
        setParams: (params: Record<string, string>) => void;
    };
}

declare module 'react-native-keyboard-aware-scroll-view' {
  import { Component } from 'react';
    import { FlatListProps, ScrollViewProps, SectionListProps } from 'react-native';

  export interface KeyboardAwareProps {
    enableOnAndroid?: boolean;
    enableAutomaticScroll?: boolean;
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
    enableResetScrollToCoords?: boolean;
    keyboardOpeningTime?: number;
    keyboardClosingTime?: number;
    viewIsInsideTabBar?: boolean;
    enableKeyboardAwareOffset?: boolean;
    keyboardAwareOffset?: number;
    keyboardAwareExtraHeight?: number;
    keyboardAwareExtraScrollHeight?: number;
    keyboardAwareViewProps?: any;
    contentContainerStyle?: any;
    enableKeyboardAwareView?: boolean;
    extraHeight?: number;
    extraScrollHeight?: number;
    enableResetKeyboardAwarePosition?: boolean;
    resetScrollToCoords?: { x: number; y: number };
    scrollEnabled?: boolean;
    showsVerticalScrollIndicator?: boolean;
  }

  export class KeyboardAwareScrollView extends Component<ScrollViewProps & KeyboardAwareProps> {}
  export class KeyboardAwareFlatList<T> extends Component<FlatListProps<T> & KeyboardAwareProps> {}
  export class KeyboardAwareSectionList<T> extends Component<SectionListProps<T> & KeyboardAwareProps> {}
} 