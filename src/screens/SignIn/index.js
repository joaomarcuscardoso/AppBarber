import React, {useState} from 'react';
import {useNavigation } from '@react-navigation/native';
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import SignInput from '../../components/SignInput.js';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

  const navigation = useNavigation();

  const [ emailField, setEmailField ] = useState("");
  const [ passwordField, setPasswordField ] = useState("");

  const handleSignClick = () => {

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