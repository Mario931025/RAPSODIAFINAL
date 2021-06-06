import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../layout';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import {firebase} from '@react-native-firebase/auth';
import {formStyles, LayoutStyles} from '../../../components/category/styles';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [updatePasswordState, setUpdatePasswordState] = useState({
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const handlePasswordChange = (password) => {
    setUpdatePasswordState({
      ...updatePasswordState,
      password,
    });
  };

  const handleNewPasswordChange = (newPassword) => {
    setUpdatePasswordState({
      ...updatePasswordState,
      newPassword,
    });
  };

  const handleRepeatPasswordChange = (repeatNewPassword) => {
    setUpdatePasswordState({
      ...updatePasswordState,
      repeatNewPassword,
    });
  };

  const isFormValid = () => {
    if (updatePasswordState.password === '') {
      return false;
    }

    if (
      updatePasswordState.newPassword !== '' &&
      updatePasswordState.repeatNewPassword !== ''
    ) {
      if (
        updatePasswordState.newPassword ===
        updatePasswordState.repeatNewPassword
      ) {
        return true;
      }
    }
    return false;
  };

  const handleChange = () => {
    const isValid = isFormValid();
    if (isValid) {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const {password, newPassword} = updatePasswordState;
        const provider = firebase.auth.EmailAuthProvider;

        const authCredential = provider.credential(currentUser.email, password);

        currentUser.reauthenticateWithCredential(authCredential).then(
          (userCredential) => {
            userCredential.user.updatePassword(newPassword).then();
            console.log('Cambio exitoso!!');
            Alert.alert(
              'Cambio exitoso!!',
              'La contraseña se ha actualizado de manera correcta.',
            );
          },
          (error) => {
            console.error(error);
            Alert.alert('Contraseña incorrecta', 'La contraseña es incorrecta');
          },
        );
      }
    } else {
      Alert.alert('Cambio de contraseña', 'Por favor valide la información');
    }
  };

  return (
    <>
      <Layout nav={() => navigation.openDrawer()} />
      <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
        <KeyboardAvoidingView behavior={null} keyboardVerticalOffset={'none'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={{marginVertical: 10}}>
                <Text>contraseña</Text>
                <TextInput
                  style={[
                    formStyles.input,
                    formStyles.btnText,
                   
                  ]}
                  
                 
                  placeholder="Contraseña"
                  value={updatePasswordState.password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text>Nueva contraseña</Text>
                <TextInput
                  style={[
                    formStyles.input,
                    formStyles.btnText,
                   
                  ]}
                  placeholder="Contraseña"
                  value={updatePasswordState.newPassword}
                  onChangeText={handleNewPasswordChange}
                  secureTextEntry
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text>Repetir contraseña</Text>
                <TextInput
                   style={[
                    formStyles.input,
                    formStyles.btnText,
                   
                  ]}
                  placeholder="Repetid contraseña"
                  value={updatePasswordState.repeatNewPassword}
                  onChangeText={handleRepeatPasswordChange}
                  secureTextEntry
                />
              </View>

              <View style={{marginVertical: 30}}>
                <Button
                  mode="contained"
                  onPress={handleChange}
                  theme={{
                    colors: {
                      primary: '#967B4A',
                    },
                  }}>
                  Cambiar contraseña
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ChangePassword;
