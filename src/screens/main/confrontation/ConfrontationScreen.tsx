import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '../../../components/search/SearchInput';
import PendingScreen from './pending/PendingScreen';
import ApprovedScreen from './approved/ApprovedScreen';
import { FilterOptions } from '../../../components/modals/FilterModal';

const ConfrontationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <SvgImage
              source={require("../../../assets/svg/back/back.svg")}
              height={14}
              width={14}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t("Üzləşmə")}</Text>

          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.searchContainer}>
          <SearchInput 
            onSearch={handleSearch} 
            value={searchQuery} 
            onFilter={handleFilter}
          />
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'pending' && styles.activeTabButton]}
              onPress={() => setActiveTab('pending')}
            >
              <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
                {t('Təsdiq gözləyənlər')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'approved' && styles.activeTabButton]}
              onPress={() => setActiveTab('approved')}
            >
              <Text style={[styles.tabText, activeTab === 'approved' && styles.activeTabText]}>
                {t('Təsdiqlənmiş')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === 'pending' ? (
          <PendingScreen searchQuery={searchQuery} filters={filters} />
        ) : (
          <ApprovedScreen searchQuery={searchQuery} filters={filters} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#110C22',
    fontFamily: 'Onest-Medium',
    fontWeight: '600',
  },
  searchContainer: {
    paddingTop: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    padding: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#015656',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Onest-Medium',
    color: '#B3B1B8',
  },
  activeTabText: {
    color: '#015656',
  },
});

export default ConfrontationScreen;