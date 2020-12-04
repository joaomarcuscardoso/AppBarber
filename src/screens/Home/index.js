import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import { 
  Container, 
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,

  LocationArea,
  LocationInput,
  LocationFinder,

 } from './styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';


export default () => {

  const navigation = useNavigation();

  const [locationText, setLocationText] = useState("");

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre seu barbeiro favorito</HeaderTitle>
          <SearchButton onPress={()=>navigation.navigate("Search")} >
            <SearchIcon width="26" height="26" fill="#ffffff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LocationInput 
            placeholder="Onde você está?"
            placeholderTextColor="#ffffff"
            value={locationText}
            onChangeText={t=>setLocationText(t)}
          />
            <LocationFinder>
              <MyLocationIcon width="24" height="24" fill="#ffffff" />
            </LocationFinder>
        </LocationArea>



      </Scroller>
    </Container>
  );
}