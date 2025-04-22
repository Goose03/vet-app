import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Text as RNText } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase'; 
import { useRouter } from 'expo-router';
import Header from './Header';

interface Animal {
  id: string;
  name: string;
  age: number;
  image: string;
  species: string; 
}

export default function MainMenu() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onSnapshot(collection(db, 'Animales'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Animal[];
      setAnimals(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/bg-leopard.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ borderRadius: 0 }}
    >
      <Header title="Anymalia" />

      <View style={styles.overlay}>
        <FlatList
          data={animals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/AnimalDetail',
                  params: {
                    name: item.name,
                    age: String(item.age),
                    image: item.image,
                    species: item.species, 
                  },
                })
              }
              style={styles.animalItem}
            >
              <RNText style={styles.animalText}>{item.name}</RNText>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/NewAnimal')}
        >
          <RNText style={styles.addButtonText}>Add New Animal</RNText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  animalItem: {
    padding: 16,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 8,
    marginBottom: 12,
  },
  animalText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#77AD63',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
