import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/az';

const WAITING_KEY = 'waiting_start_time';

const WaitingScreen = () => {
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');

  useEffect(() => {
    const initializeTimer = async () => {
      let storedTime = await AsyncStorage.getItem(WAITING_KEY);

      if (!storedTime) {
        const now = new Date().toISOString();
        await AsyncStorage.setItem(WAITING_KEY, now);
        storedTime = now;
      }

      const startTime = moment(storedTime);
      const endTime = startTime.clone().add(24, 'hours');

      const interval = setInterval(() => {
        const now = moment();
        const duration = moment.duration(endTime.diff(now));

        if (duration.asSeconds() <= 0) {
          clearInterval(interval);
          setRemainingTime('00:00:00');
          return;
        }

        const formatted = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:${String(
          duration.minutes(),
        ).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;
        setRemainingTime(formatted);
      }, 1000);

      return () => clearInterval(interval);
    };

    initializeTimer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Hesabınız yoxlanılır</Text>
        <Text style={styles.description}>
          Hesabınız 24 saat ərzində təsdiq olunacaq.
        </Text>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{remainingTime}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WaitingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    color: '#110C22',
    fontFamily: 'Onest-Medium',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.48)',
    fontFamily: 'Onest-Regular',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  timerWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: '#E6F1F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timer: {
    fontSize: 32,
    fontFamily: 'Onest-Medium',
    color: '#015656',
    letterSpacing: 1.5,
  },
});
