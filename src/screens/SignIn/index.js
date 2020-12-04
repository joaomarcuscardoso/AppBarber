import React, {useState, useContext} from 'react';
import { Alert } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';


import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';

import SignInput from '../../components/SignInput.js';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [ emailField, setEmailField ] = useState("");
  const [ passwordField, setPasswordField ] = useState("");

  const handleSignClick = async () => {
    if(emailField != "" && passwordField != "")  {

      let json =  await Api.signIn(emailField, passwordField);

      if(json.token) {
        await AsyncStorage.setItem("token", json.token);
        userDispatch({
          type:"setAvatar",
          payload: {
            avatar: json.data.avatar
          }
        });

        navigation.reset({
          routes: [{name:"MainTab"}]
        });
      } else {
        Alert.alert("Tente Novamente", "E-mail e/ou senha errados!");
      }

    } else {
      alert("Preencha os campos!");
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({ 
      routes:[{name: "SignUp"}]

    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={t=>setEmailField(t)}
        />
        <SignInput 
          IconSvg={LockIcon}
          value={passwordField} 
          placeholder="Digite sua senha"
          onChangeText={t=>setPasswordField(t)}
          password={true}
        />


        <CustomButton onPress={handleSignClick} >
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>

        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
        </SignMessageButton>

      </InputArea>

    </Container>
  );
}