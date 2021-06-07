import 'react-native-gesture-handler';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Layout from '../layout';
import {formStyles, LayoutStyles} from '../../components/category/styles';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

const width = Dimensions.get('window').width;

const Register = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function register() {
    try {
      const authStatus = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore()
        .collection('users')
        .doc(authStatus.user.uid)
        .set({email, uid: authStatus.user.uid, create: new Date()});
       
        navigation.navigate('Profile');
        Alert.alert(
          'Registro exitoso!!',
          '!Bienvenido!',
        );

        
    } catch (e) {
      console.log(e);
      Alert.alert(
        'La contraseña debe de tener formato XXX@CORRREO.COM!!',
        '!La contraseña debe de tener 6 caracteres minimo!',
      );
    }
  }

  return (
    <>
     <ScrollView showsVerticalScrollIndicator={false}>
      <Layout nav={() => navigation.openDrawer()} />
      
      <View style={[LayoutStyles.container]}>
      <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <Text style={styles.titulo}>REGISTER</Text>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              formStyles.input,
              formStyles.btnText,
            ]}

          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            style={[
              formStyles.input,
              formStyles.btnText,
            ]}
          />
           <TouchableOpacity
           style={styles.buttonContainer}
           onPress={() => register(email, password)}
           >
             <Text style={(formStyles.btnText, styles.btnRegister)}>
               Registrate
             </Text>
          
           
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      </KeyboardAvoidingView>
      </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({

  titulo: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeueLTStd-Bd' : 'HelveticaNeueLTStd BOLD',
    fontSize: width / 18,
    marginVertical: 5,
    marginLeft: width / 3.4,
    paddingBottom: 20,
    marginTop: -8,
  },
  btnRegister: {
    marginTop: 5,
    color: "#fff",
    paddingBottom:5

   
  },
  buttonContainer: {
    marginTop: 10,
    width: width / 2,
    backgroundColor: '#967b4A',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default Register;
