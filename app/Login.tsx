import { StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View, Image, TextInput,TouchableOpacity, Modal,ActivityIndicator } from "react-native";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import{getFirestore,doc,setDoc} from "firebase/firestore";
import { app } from '../firebase'; 
import { useRouter } from 'expo-router';
import MainMenu from "./(tabs)/MainMenu";

//inicializa firebase
const auth= getAuth(app);
const db= getFirestore(app);

export default function Login(){
    const router = useRouter();

    //logica
    //manejo de inputs y advertencias
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [warningText, setWarningText] = useState('');
    const[loading, setLoading]=useState(false);
    
    //validacion del email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //validacion de contrsenia
    const validatePassword=(password:string)=>{
        const minLength =8;
        const hasUpperCase=/[A-Z]/.test(password);
        const hasLowerCase=/[a-z]/.test(password);
        const hasNumber=/\d/.test(password);
        const hasSpecialChar=/[\W_]/.test(password);
        return{
            isValid: password.length >= 
            minLength && 
            hasUpperCase && 
            hasLowerCase && 
            hasNumber && 
            hasSpecialChar,
            requirements:{
                minLength,
                upperCase:hasUpperCase,
                lowerCase:hasLowerCase,
                number:hasNumber,
                specialChar:hasSpecialChar
            }
        };
    };

    const handleAuthAction = async(action: 'login' | 'signup') => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            if (action === 'login') {
                const userCredential= await signInWithEmailAndPassword(auth, email, password)//.then(router.push('(tabs)/MainMenu'));
                //console.log(userCredential);
                if (userCredential) {
                    router.push('(tabs)/MainMenu');
                }
            } else {
               const userCredential= await createUserWithEmailAndPassword(auth, email, password);
               await setDoc(doc(db, 'users', userCredential.user.uid), {
                    correo:email,
                    fechaRegistro: new Date().toISOString(),
                    rol:'usuario',
                    estado:'activo',
                });
            }
            setEmail('');
            setPassword('');
        } catch (error:any) {
            // Manejar errores
            handleAuthError(error.code, action);
        } finally {
            setLoading(false);
        }   
    };

    //validacion de los campos
    const validateFields = () => {
        if (!email || !password) {
            setWarningText('Por favor completa todos los campos');
            setShowWarning(true);
            return false;
        }if (!validateEmail(email)) {
            setWarningText('Por favor ingrese un correo válido');
            setShowWarning(true);
            return false;
        }

        const passwordValidation=validatePassword(password);
        if (!passwordValidation.isValid) {
            const missingRequirements=[];
            if (password.length < passwordValidation.requirements.minLength) {
                missingRequirements.push(`Mínimo ${passwordValidation.requirements.minLength} caracteres`);
        }
        if (!passwordValidation.requirements.upperCase) {
            missingRequirements.push('Una letra mayúscula');
        }
        if (!passwordValidation.requirements.lowerCase) {
            missingRequirements.push('Una letra minúscula');
        }
        if (!passwordValidation.requirements.number) {
            missingRequirements.push('Un número');
        }
        if (!passwordValidation.requirements.specialChar) {
            missingRequirements.push('Un carácter especial');
        }
        setWarningText(`La contraseña debe contener: ${missingRequirements.join(', ')}`);
        setShowWarning(true);
        return false;      
    }
    setShowWarning(false);
    return true;
};  

    const handleAuthError = (errorCode: string, action: string) => {
        switch (errorCode) {
          case 'auth/user-not-found':
            setWarningText('Usuario no registrado');
            break;
          case 'auth/wrong-password':
            setWarningText('Contraseña incorrecta');
            break;
          case 'auth/email-already-in-use':
            setWarningText('El correo ya está registrado');
            break;
          case 'auth/invalid-email':
            setWarningText('Correo electrónico inválido');
            break;
          case 'auth/weak-password':
            setWarningText('La contraseña no cumple con los requisitos minimos');
            break;
          default:
            setWarningText(`Error en ${action === 'login' ? 'inicio de sesión' : 'registro'}`);
        }
        setShowWarning(true);
      };




   return (
    <View style={styles.container}>
        <Image 
        source={require('../assets/images/panda.jpg')} 
        style={styles.backgoundImg}/>
        <View style={styles.overlay} />

        <View style={styles.header}>
            <Text style={styles.title}>Anymalia
                <Image 
                source={require('../assets/images/paw.png')} 
                style={styles.pawImg}/>
            </Text>
        </View>

        <Modal
                visible={showWarning}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowWarning(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.warningText}>{warningText}</Text>
                        
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setShowWarning(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        <View style={styles.content}>      
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input}
                 placeholder="example@hotmail.com" 
                 placeholderTextColor={'#ccc'}
                 value={email}
                 onChangeText={setEmail}
                 keyboardType="email-address"/>
                
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} 
                placeholder="Contraseña" 
                placeholderTextColor={'#ccc'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}/>
            </View>

            <View style={styles.buttonRow}>
                    <TouchableOpacity 
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={() => handleAuthAction('login')}
                    disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#2F0C59" /> ):(
                            <Text style={styles.buttonTxt}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={() => handleAuthAction('signup')}
                    disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#2F0C59" /> ):(
                            <Text style={styles.buttonTxt}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>
        </View>
    </View>
   ) 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
    },
    backgoundImg:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity:0.9,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1A1A1A',
        opacity: 0.6,
      },
    content:{
        flex: 1,
        justifyContent: 'center',
        padding:20,  
    },
    header:{
        backgroundColor:'#77AD63',
        alignItems:'center',
        paddingVertical: 20,
    },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    pawImg:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
        paddingLeft:55,
        tintColor:'#FFFFFF',
        marginTop:10,
    },
    form:{
        backgroundColor: "#77AD63",
        padding: 25,
        borderRadius: 20,
        marginTop: 10,
    },
    label:{
        color:'#FFFFFF',
        fontSize:26,
        fontWeight: 'bold',
        marginTop:15,
        paddingHorizontal: 10,
    },
    input:{
        backgroundColor:'#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical:20,
        marginTop: 5,
        fontSize:20,
    },
    buttonRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:50,
    },
    button:{
        backgroundColor:'#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        alignItems:'center',
    },
    buttonTxt:{
        color:'#2F0C59',
        fontSize:26,
        fontWeight: 'bold',
    },
    warningText:{
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    warningContainer:{
        backgroundColor: '#9667CF',
        padding: 50,
        borderRadius: 8,
        margin: 20,
        position: 'absolute',
        top: 120,
        alignSelf: 'center',
        zIndex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#9667CF',
        padding: 25,
        borderRadius: 15,
        width: '70%',
        alignItems: 'center',
        elevation: 5,
    },
    closeButton: {
        backgroundColor: '#FF4444',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop:30,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton:{
        opacity:0.7,
    },

});