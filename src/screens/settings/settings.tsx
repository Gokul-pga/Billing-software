import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import CustomIcon from '../../utils/icons';
import axios from 'axios';
import { api } from '../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User =[]

export type SettingsProps = {};

const SettingsScreen = (props: SettingsProps) => {
  const navigation = useNavigation();

  const [addUser, setaddUser] = useState<User[]>()

useEffect(() => {
    const email =  AsyncStorage.getItem('userEmail');
    fetchProducts();
}, [])


  const fetchProducts = async () => {
    try {
      const response = await axios.get(api+
        '/auth/getUser',
      );
      setaddUser(response.data.data); // Assuming response.data.data is an array of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <View
      style={{
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#eeeeee',
        padding: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#000'}}>Profile</Text>
        </View>
        <View>
          <CustomIcon
            color="#000"
            size={22}
            name="arrow-back"
            type="Ionicons"
          />
        </View>
      </View>
      <View style={{padding:10,backgroundColor:"#b3d9ff"}}>
        <View style={{width:"100%",flexDirection:"row",justifyContent:"flex-start"}}>
            <Image source={require("../../../assets/images/user-profile.jpg")} style={{width:120,height:120}}/>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
