import { StyleSheet, TextStyle } from 'react-native';

import { colors } from './color';
import { normalize } from './metrics';

export const interFonts = {
  300: 'Inter_24pt-Light',
  400: 'Inter_24pt-Regular',
  500: 'Inter_24pt-Medium',
  700: 'Inter_28pt-Bold',
  800: 'Inter_28pt-ExtraBold',
};

const fontSize46 = normalize('font', 46);
const fontSize32 = normalize('font', 32);
const fontSize24 = normalize('font', 24);
const fontSize20 = normalize('font', 20);
const fontSize18 = normalize('font', 18);
const fontSize16 = normalize('font', 16);
const fontSize14 = normalize('font', 14);
const fontSize12 = normalize('font', 12);
const fontSize10 = normalize('font', 10);

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
//   color: colors.text.space[800],
};

export const TypographyStyles = StyleSheet.create({
  title1: {
    fontSize: fontSize46,
    fontFamily: interFonts[800], // ExtraBold
    ...commonFontStyling,
  },
  title2: {
    fontSize: fontSize32,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  title3: {
    fontSize: fontSize24,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  LargeNoneBold20: {
    fontSize: fontSize20,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  LargeNoneMedium20: {
    fontSize: fontSize20,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },
  LargeNoneRegular20: {
    fontSize: fontSize20,
    fontFamily: interFonts[400],
    ...commonFontStyling,
  },
  LargeNoneRegular800: {
    fontSize: fontSize20,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  LargeNoneBold: {
    fontSize: fontSize18,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  LargeNoneMedium: {
    fontSize: fontSize18,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },
  LargeNoneRegular: {
    fontSize: fontSize18,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  RegularNoneMedium: {
    fontSize: fontSize16,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },
  RegularNoneBold: {
    fontSize: fontSize16,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  RegularNoneRegular: {
    fontSize: fontSize16,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  RegularTightMedium: {
    fontSize: fontSize16,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },
  RegularTightRegular: {
    fontSize: fontSize16,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  SmallNoneMedium: {
    fontSize: fontSize14,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },

  SmallNoneBold: {
    fontSize: fontSize14,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  SmallNoneRegular: {
    fontSize: fontSize14,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  SmallNormalRegular: {
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  TinyNormalRegular: {
    fontSize: fontSize12,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  TinyNoneMedium: {
    fontSize: fontSize12,
    fontFamily: interFonts[500], // Medium
    ...commonFontStyling,
  },
  TinyNoneBold: {
    fontSize: fontSize12,
    fontFamily: interFonts[700], // Bold
    ...commonFontStyling,
  },
  TinyNoneExtraBold: {
    fontSize: fontSize12,
    fontFamily: interFonts[800], // Bold
    ...commonFontStyling,
  },
  SmallTightRegular: {
    fontSize: fontSize14,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  InterExtraBold20: {
    fontSize: fontSize20,
    fontFamily: interFonts[800], // ExtraBold
    lineHeight: 26,
    letterSpacing: -0.5,
    ...commonFontStyling,
  },
  TinyNoneLight: {
    fontSize: fontSize12,
    fontFamily: interFonts[300],
    ...commonFontStyling,
  },
  MiniNormalRegular: {
    fontSize: fontSize10,
    fontFamily: interFonts[400], // Regular
    ...commonFontStyling,
  },
  LargeNoneLarge: {
    fontSize: fontSize24,
    fontFamily: interFonts[500],
    ...commonFontStyling,
  },
});