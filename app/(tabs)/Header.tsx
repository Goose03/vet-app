import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as RNText } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <RNText style={styles.headerText}>{title}</RNText>
        <Ionicons 
          name="paw" 
          size={28} 
          color="#FFFFFF" 
          style={styles.pawIcon} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#77AD63',
    paddingVertical: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    position: 'relative',
    left: 0,
    right: 0
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 10,
  },
  pawIcon: {
    marginTop: 3
  }
});

export default Header;