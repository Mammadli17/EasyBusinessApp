import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SvgImage } from '../svgImage/SvgImage';
import { TypographyStyles } from '../../theme/typography';
import CustomInput from '../input/TextInput';
import CustomButton from '../button/CustomButton';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface InputField {
  icon: any;
  value: string;
  placeholder: string;
  editable?: boolean;
  withEditButton?: boolean;
  onEditPress?: () => void;
  onChangeText?: (text: string) => void;
}

export interface ButtonField {
  title: string;
  onPress: () => void;
  style?: 'default' | 'logout';
}

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
  open?: boolean;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
  style?: object;
  chevronStroke?: string;
  textColor?: string;
  // Enhanced accordion props for profile usage
  inputFields?: InputField[];
  buttonFields?: ButtonField[];
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  open,
  onPress,
  rightIcon,
  style,
  chevronStroke = '#232323',
  textColor = '#232323',
  inputFields,
  buttonFields,
}) => {
  // If open is undefined, manage state internally
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onPress) {
      onPress();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const renderInputFields = () => {
    if (!inputFields) return null;

    return inputFields.map((field, index) => (
      <React.Fragment key={`input-${index}`}>
        {index > 0 && <View style={{ height: 12 }} />}
        <View style={styles.inputContainer}>
          <CustomInput
            icon={field.icon}
            value={field.value}
            placeholder={field.placeholder}
            editable={field.editable ?? false}
            placeholderTextColor="#B3B1B8"
            textColor="#B3B1B8"
            containerStyle={styles.inputContainerStyle}
            withEditButton={field.withEditButton}
            onEditPress={field.onEditPress}
            onChangeText={field.onChangeText}
          />
        </View>
      </React.Fragment>
    ));
  };

  const renderButtonFields = () => {
    if (!buttonFields) return null;

    return buttonFields.map((button, index) => (
      <React.Fragment key={`button-${index}`}>
        {index > 0 && <View style={{ height: 12 }} />}
        <CustomButton
          title={button.title}
          onPress={button.onPress}
          buttonStyle={button.style === 'logout' ? styles.logoutBtn : styles.settingsBtn}
          textStyle={button.style === 'logout' ? styles.logoutBtnText : styles.settingsBtnText}
        />
      </React.Fragment>
    ));
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.header} onPress={handlePress} activeOpacity={0.7}>
        <Text style={[TypographyStyles.TinyNoneMedium, { color: textColor }]}>{title}</Text>
        {rightIcon !== undefined ? rightIcon : (
          <SvgImage
            source={require('../../assets/svg/profile/chevron.svg')}
            width={18}
            height={18}
            stroke={chevronStroke}
            style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {renderInputFields()}
          {renderButtonFields()}
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  content: {
    padding: 16,
  },
  inputContainer: {
    flex: 1,
  },
  inputContainerStyle: {
    marginBottom: 0,
  },
  settingsBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
  },
  settingsBtnText: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFE5E5',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
  },
  logoutBtnText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Accordion;