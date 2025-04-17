import React from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import Ganso from "../assets/images/ganso.jpg"; // your background image
import firestore from '@react-native-firebase/firestore';
import{ initializeApp } from "firebase/app";
import{getFirestore,doc,setDoc} from "firebase/firestore";

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

  const [nombre, onChangeNombre] = React.useState('');
  const [edad, onChangeEdad] = React.useState('');
  const [img, onChangeImg] = React.useState('');

  const handlePress = () => {
    if(nombre != '' && edad != '' && img != ''){
      Alert.alert(`Nombre: ${nombre} Edad: ${edad} Imagen URL: ${img}`);
    }
    else{
      Alert.alert('Los datos no son validos')
    }
  };

  return (
    <View className="bg-bggrey flex-1 w-screen">
      <ImageBackground
      source={Ganso}
      resizeMode="cover"
      className="flex-1 w-full items-center justify-center opacity-60"
      >
      
      <View className="bg-bggrey p-10 rounded-3xl w-2/3 h-3/5">
        <Text className="text-white text-xl font-bold mb-5">Add New Animal</Text>
        
        <View className='flex-1 justify-between'>
          
          <View>
            <Text className='text-white text-xl font-bold m-5'>Nombre</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeNombre}
              value={nombre}
              multiline={false}
              numberOfLines={1}
            />
          </View>


          <View>
            <Text className='text-white text-xl font-bold m-5'>Edad</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeEdad}
              value={edad}
              keyboardType="numeric"
              multiline={false}
              numberOfLines={1}
            />
          </View>

          <View>
            <Text className='text-white text-xl font-bold m-5'>URL Imagen</Text>
            <TextInput
              className='text-xl pl-5 font-bold bg-white rounded-2xl'
              onChangeText={onChangeImg}
              value={img}
              multiline={false}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
      className='w-2/3'
      onPress={handlePress}>
            <View className="bg-lgreen p-2 rounded-xl m-5">
              <Text className="text-white text-center text-xl">Submit</Text>
            </View>
          </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
