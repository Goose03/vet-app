import React from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import Ganso from "../assets/images/ganso.jpg"; 
import firestore from '@react-native-firebase/firestore';
import{ initializeApp } from "firebase/app";
import{ getFirestore, collection, doc, addDoc } from "firebase/firestore";

export default function NewAnimal() {
  const firebaseConfig ={
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
  };
  
  const app = initializeApp(firebaseConfig);
  const db= getFirestore(app);

  const [name, onChangeName] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [species, onChangeSpecies] = React.useState('');
  const [image, onChangeImage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  const handlePress = async() => {
    if(name != '' && age != '' && image != ''){
      //Alert.alert(`Name: ${name} Age: ${age} Species: ${species} Imagen URL: ${image}`);
      setDisabled(true);
      try {
        var animalesCollection = collection(db, "Animales");
            const newDoc = await addDoc(
              animalesCollection, {
                name : name,
                age : age,
                species : species,
                image : image,
              }
            );
      }
      catch (error) { 
        console.error(error);
      }
      finally {
        Alert.alert('Animal agregado correctamente');
        onChangeName('');
        onChangeAge('');
        onChangeSpecies('');
        onChangeImage('');
      }
    }
    else{
      Alert.alert('Los datos no son validos');
      setDisabled(false);
    }
  };

  return (
    <View className="bg-bggrey flex-1 w-screen">
      <ImageBackground
      source={Ganso}
      resizeMode="cover"
      className="flex-1 w-full items-center justify-center opacity-60"
      >
      
      <View className="bg-bggrey p-10 rounded-3xl w-2/3 h-4/5">
        <Text className="text-white text-xl font-bold mb-5">Add New Animal</Text>
        
        <View className='flex-1 justify-between'>
          
          <View>
            <Text className='text-white text-xl font-bold m-5'>Name</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeName}
              value={name}
              multiline={false}
              numberOfLines={1}
            />
          </View>


          <View>
            <Text className='text-white text-xl font-bold m-5'>Age</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeAge}
              value={age}
              keyboardType="numeric"
              multiline={false}
              numberOfLines={1}
            />
          </View>

          <View>
            <Text className='text-white text-xl font-bold m-5'>Species</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeSpecies}
              value={species}
              keyboardType="numeric"
              multiline={false}
              numberOfLines={1}
            />
          </View>

          <View>
            <Text className='text-white text-xl font-bold m-5'>URL Image</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeImage}
              value={image}
              multiline={false}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
      className='w-2/3'
      onPress={handlePress}
      disabled={disabled}>
            <View className="bg-lgreen p-2 rounded-xl m-5">
              <Text className="text-white text-center text-xl">Submit</Text>
            </View>
          </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
