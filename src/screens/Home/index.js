import React, {useEffect, useState } from 'react';
import { PlatForm } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS } from 'react-native-permissions';

import Geolocation from '@react-native-community/geolocation';

import { 
  Container, 
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,

  LocationArea,
  LocationInput,
  LocationFinder,

  LocationIcon,


 } from './styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import Api from '../../Api';

export default () => {

  const navigation = useNavigation();

  const [locationText, setLocationText] = useState("");
  const [coords, setCoords ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleLocationFinder = async () => {
    setCoords(null);

    // GET PERMISSIONS 
    let result = await request(
      Platform.OS == "ios" ? 
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : 
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    // GET LOCATION AND BARBERS;
    if(result == "granted") {
      Geolocation.getCurrentPosition((info)=> {
        setLoading(true);
        setLocationText("");

        setCoords(info.coords);
        getBarbers();
      });
    }
  }

  const getBarbers = async ()  => {
    setLoading(true);
    setList([]);

    let res = await Api.getBarbers();
    console.log(res);
    if(res.error == "") {      

      setList(res.data);
    } else {
      alert("Erro: "+res.error);
    }

    setLoading(false);
  }

  useEffect(()=> {
    getBarbers();
  }, []);

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
            <LocationFinder onPress={handleLocationFinder}>
              <MyLocationIcon width="24" height="24" fill="#ffffff" />
            </LocationFinder>
        </LocationArea>
        {loading && 
        
          <LocationIcon size="large" color="#ffffff" />
        }


      </Scroller>
    </Container>
  );
}