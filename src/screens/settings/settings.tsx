import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import CustomIcon from '../../utils/icons';
import axios from 'axios';
import {api} from '../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../utils/theme/colors';
interface User {
  username: String;
  mobilenumber: String;
  email: String;
  password: String;
}
export type SettingsProps = {};

const SettingsScreen = (props: SettingsProps) => {
  const navigation = useNavigation();

  const [addUser, setAddUser] = useState<User[]>([]);
  const [showCurrentUser, setShowCurrentUser] = useState<String | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setShowCurrentUser(email);
      const response = await axios.get(api + '/auth/getUser');
      setAddUser(response.data.data);
      console.log(response.data.data, 'Fetched Users');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredcustomer = addUser.filter(
    item => item.email === showCurrentUser,
  );

  return (
    <View
      style={{
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor:colors.primary,
        }}>
          <View>
          <Pressable onPress={()=>{
          navigation.goBack();
        }}>
          <CustomIcon
            color="#fff"
            size={22}
            name="arrow-back"
            type="Ionicons"
          />
        </Pressable>
        <View>
          <Text style={{fontSize: 18, color: '#000'}}></Text>
        </View>
          </View>
          <View style={{flexDirection:"row",gap:5,width:"100%",justifyContent:"space-between",paddingBottom:5}}>
            <Text style={{fontSize:18,color:"#fff"}}>Profile Page</Text>
            <View style={{flexDirection:"row",gap:10,justifyContent:"center",alignItems:"center"}}>
              <Text style={{fontSize:20,color:"#fff"}}>Logout</Text>
            <Pressable onPress={()=>{
          navigation.goBack();
        }}>
          <CustomIcon
            color="#fff"
            size={22}
            name="logout"
            type="AntDesign"
          />
        </Pressable>
            </View>
          </View>
          
        
      </View>
      
      <View style={{paddingTop:5}}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              paddingLeft: 10,
              color: '#000',
            }}>
            Store Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            gap: 5,
            backgroundColor: '#ebebeb',
            margin: 15,
            borderRadius: 15,
            padding: 5,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-end',
                marginTop: 5,
              }}>
              <View
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={require('../../../assets/images/Logo.png')}
                  style={{height: hp(6), width: wp(25)}}
                />
              </View>
             <View style={{
            width: '65%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
             <View style={{width:"100%",justifyContent:"center",alignItems:"flex-end"}}>
              <Text
                style={{color: '#1D6B39', fontWeight: 'bold', fontSize:22}}>
                SK VEGETABLES
              </Text>
              </View>
              <View style={{flexDirection:"row",width:"100%",justifyContent:"flex-end",alignItems:"flex-start"}}>
              <View><Text
                style={{
                  color: '#1D6B39',
                  fontWeight: 'bold',
                  fontSize: hp(1.9),

                }}>
                Cell :
              </Text></View>
                <View>
                <Text
                  style={{
                    color: '#1D6B39',
                    fontWeight: 'bold',
                    fontSize: hp(1.9),
                    width: wp('30%'),
                  }}>
                  098947 54308
                </Text>
                <Text
                  style={{
                    color: '#1D6B39',
                    fontWeight: 'bold',
                    fontSize: hp(1.9),
                    width: wp('30%'),
                  }}>
                  090420 66533
                </Text>
                </View>
              </View>
              
             </View>
              
            </View>
          </View>

          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 10,
              paddingTop:15
            }}>
            <View
              style={{
                width: wp('87%'),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap:5
              }}>
            
              <Text
                style={{
                  color: '#1D6B39',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight:20
                }}>
                Wholesale of CURRY LEAF, MALLY, PUTHINA ORDER SUPPLIERS
              </Text>
              <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>
                No.10 Transport Market, Karamadai, Coimbatore Dist.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          backgroundColor: '#ebebeb',
          margin: 15,
          borderRadius: 12,
        }}>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../../assets/images/user-profile.png')}
            style={{width: 130, height: 130}}
          />
        </View>
        <View
          style={{
            width: '65%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {filteredcustomer.map((item, id) => (
            <View key={id} style={{gap: 10}}>
              <Text style={{color: '#000', fontSize: 20}}>{item.username}</Text>
              <Text style={{color: '#000', fontSize: 16}}>{item.email}</Text>
              <Text style={{color: '#000', fontSize: 16}}>
                {item.mobilenumber}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
