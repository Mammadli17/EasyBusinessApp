import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgImage } from '../../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';

const SearchInput = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SvgImage
        source={require("../../../../assets/svg/textInput/search.svg")}
        height={18}
        width={18}
        stroke="#C6C5CA"
      />
      <TextInput
        style={styles.input}
        placeholder={t('Axtar')}
        placeholderTextColor="#B3B1B8"
      />
      <TouchableOpacity>
        <SvgImage
          source={require("../../../../assets/svg/textInput/filter.svg")}
          height={18}
          width={18}
          stroke="#110C22"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#ECECED',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Onest-Medium',
    color: '#110C22',
  },
});

export default SearchInput;
