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
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

  const navigation = useNavigation();

  const [nameField, setNameField ] = useState("");
  const [ emailField, setEmailField ] = useState("");
  const [ passwordField, setPasswordField ] = useState("");

  const handleSignClick = () => {

  }

  const handleMessageButtonClick = () => {
    navigation.reset({ 
      routes:[{name: "SignIn"}]

    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput 
          IconSvg={PersonIcon} 
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={t=>setNameField(t)}
        />
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>

        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
        </SignMessageButton>

      </InputArea>

    </Container>
  );
}