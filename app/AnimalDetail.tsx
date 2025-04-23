import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AnimalDetail() {
  const { name, age, image, species } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: image as string }} 
        style={styles.backgroundImage}
        blurRadius={15}
      />

      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name="paw" size={32} color="#77AD63" style={{ marginBottom: 8 }} />
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.detail}>
            Age: <Text style={styles.highlight}>{age}</Text> years
          </Text>

          <Text style={styles.detail}>
            Species: <Text style={styles.highlight}>{species}</Text>
          </Text>

          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: image as string }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Botón de adopción */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Adoptame</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333333',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  highlight: {
    color: '#77AD63',
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#77AD63',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
