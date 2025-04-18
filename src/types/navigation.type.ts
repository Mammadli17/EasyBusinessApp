import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Routes } from "../navigations/routes";

export type RootStackParamList = {
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
};

export type BottomTabParamList = {
  [Routes.home]: undefined;
  [Routes.confrontation]: undefined;
  [Routes.tickets]: undefined;
  [Routes.profile]: undefined;
};

export type TabScreenProps = BottomTabScreenProps<BottomTabParamList>;
