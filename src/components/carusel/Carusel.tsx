import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: {
      uri: 'https://www.pepsimax.com.au/prod/s3fs-public/2024-02/Pepsi%20Web%20Images_960x650px_Pepsi%20MAX.jpg',
    },
    text: 'Take advantage of exclusive deals and discounts tailored just for you.',
  },
  {
    id: '2',
    image: {
      uri: 'https://as1.ftcdn.net/jpg/02/94/67/10/1000_F_294671035_pe2CDpqSPhqv5ybyyy3vYBBKsdoCYDmE.webp',
    },
    text: 'Get access to member-only promotions and early-bird sales.',
  },
  {
    id: '3',
    image: {
      uri: 'https://static.euronews.com/articles/stories/09/00/98/00/1920x1080_cmsv2_3cf1de1a-fd47-54af-bae1-72f78b8a2512-9009800.jpg',
    },
    text: 'Save more with every purchase and enjoy personalized offers.',
  },
];
//animasyia fix olunmali///
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{ borderRadius: 22 }}
      >
        <View style={styles.overlay} />
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.sliderContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={width * 0.8}
          snapToAlignment="center"
        />
      </View>
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius:20
  },
  sliderContainer: {
    height: 200,
  },
  card: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 22,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 22,
    zIndex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:16
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'hsla(255, 5%, 85%, 1)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'hsla(180, 98%, 17%, 1)',
    width: 10,
    height: 10,
  },
});

export default Carousel;
