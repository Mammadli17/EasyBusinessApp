import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Routes } from "../navigations/routes";

export type RootStackParamList = {
  BottomTabs: undefined;
  [Routes.home]: undefined;
  [Routes.confrontation]: undefined;
  [Routes.tickets]: undefined;
  [Routes.profile]: undefined;
  [Routes.login]: undefined;
  [Routes.language]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.register]: undefined;
  [Routes.forgot]: undefined;
  [Routes.otp]: undefined;
  [Routes.reset]: undefined;
  [Routes.loginasan]: undefined;
  [Routes.loginemail]: undefined;
  [Routes.waiting]: undefined;
  [Routes.detail]: undefined;
  [Routes.order]: undefined;
  [Routes.paymnet]: undefined;
  [Routes.notfication]: undefined;
  [Routes.notficationDetail]: undefined;
  [Routes.pendingDetails]: undefined;
  [Routes.confrontationOtp]: {
    item: {
      id: string;
      name: string;
      amount: string;
      date: string;
      image: string;
      message: string;
    };
  };
  [Routes.changePassword]: undefined;
};

export type BottomTabParamList = {
  [Routes.home]: undefined;
  [Routes.confrontation]: undefined;
  [Routes.tickets]: undefined;
  [Routes.profile]: undefined;
};

export type TabScreenProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<BottomTabParamList, T>;
