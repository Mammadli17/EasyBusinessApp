import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
    home = 'home',
    confrontation = 'confrontation',
    tickets = 'tickets',
    profile = 'profile'
}

export type RootStackParamList = {
    BottomTabs: undefined;
};

export type BottomTabParamList = {
    [Routes.home]: undefined;
    [Routes.confrontation]: undefined;
    [Routes.tickets]: undefined;
    [Routes.profile]: undefined;
};

export type TabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
>;