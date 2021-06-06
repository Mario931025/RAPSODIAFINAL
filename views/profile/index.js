import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Layout from '../layout';
import {useNavigation} from '@react-navigation/native';
import {Avatar, TextInput} from 'react-native-paper';
import {AuthContext} from '../../providers/AuthProvider';
import {firebase} from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation();

  const {user, dataUser} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const goToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  useEffect(() => {
    console.log('dataUser', dataUser);
    if (user) {
      const current = firebase.auth().currentUser;
      if (current) {
        setCurrentUser(current);
        console.log('Current user: ', {current});
      }
    }
  }, [user]);

  return (
    <>
      <Layout nav={() => navigation.openDrawer()} />

      <View style={{flex: 1, paddingHorizontal: 20}}>
        <KeyboardAvoidingView
          behavior={null}
          keyboardVerticalOffset={'none'}
          style={{
            flex: 1,
            height: '100%',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', marginVertical: 10}}>
                Perfil
              </Text>

              <Avatar.Image
                size={150}
                source={{
                  uri: 'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk',
                }}
              />
            </View>

            <View style={{flex: 2}}>
              {/*<View style={{marginVertical: 10}}>*/}
              {/*  <Text>Nombre y Apellido</Text>*/}
              {/*  <TextInput*/}
              {/*    theme={{*/}
              {/*      colors: {*/}
              {/*        primary: '#D3C53A',*/}
              {/*      },*/}
              {/*    }}*/}
              {/*    mode="outlined"*/}
              {/*    selectionColor={'#FABB20'}*/}
              {/*    placeholder="Nombre y Apellido"*/}
              {/*    value={(currentUser && currentUser.displayName) || ''}*/}
              {/*  />*/}
              {/*</View>*/}
              <View style={{marginVertical: 10}}>
                <Text>Correo</Text>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#D3C53A',
                    },
                  }}
                  mode="outlined"
                  placeholder="Correo"
                  value={(currentUser && currentUser.email) || ''}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text>Contraseña</Text>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#D3C53A',
                    },
                  }}
                  mode="outlined"
                  placeholder="Contraseña"
                  secureTextEntry
                  value={dataUser?.password || ''}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{marginBottom: 15}}
                onPress={goToChangePassword}>
                <Text
                  style={{textDecorationLine: 'underline', color: '#D3C53A'}}>
                  ¿Desea cambiar la contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Profile;
