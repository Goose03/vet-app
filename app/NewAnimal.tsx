import { View, Text, StyleSheet } from 'react-native';

export default function NewAnimal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí va lo de goose</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
