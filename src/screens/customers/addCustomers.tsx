// import React, {useEffect, useState} from 'react';
// import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import CustomIcon from '../../utils/icons';
// import {TopHeader} from '../../components/commonComponents';
// import {labels} from '../../utils/labels';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { api } from '../../../envfile/api';

// const AddCustomers = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: '',
//   });
//   const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
//   const [imageURL, setImageURL] = useState<string | undefined>(undefined);

//   const handleImagePicker = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         includeBase64: true,
//       });
//       if (result && result.assets && result.assets.length > 0) {
//         const base64 = result.assets[0].base64!;
//         setImageURL(base64);
//       }
//     } catch (error) {
//       console.error('Image picking error:', error);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({...formData, [field]: value});
//   };

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setCurrentUser(email ?? undefined); // Handle null case
//         console.log(currentUser, 'asdfghjkl');

//         console.log('Retrieved email:', email);
//       } catch (error) {
//         console.error('Error retrieving email from AsyncStorage:', error);
//       }
//     };

//     fetchEmail();
//   }, []);

//   const [errmsg, seterrmsg] = useState<string | undefined>(undefined);
//   const handleSubmit = async () => {
//     const {name, phone, address} = formData;
//     if (name !== '' && phone !== '' && address !== '') {
//       try {
//         const response = await axios.post(api+
//           '/api/customer/customercreate',
//           {
//             customerName: name,
//             mobileNumber: phone,
//             address: address,
//             creator: currentUser, // Replace with the actual creator ID or logic
//           },
//         );
//         setFormData({
//           name: '',
//           phone: '',
//           address: '',
//         });

//         console.log('Customer creation successful:', response.data);

//         // Assuming you navigate to the CustomerDetails screen upon successful submission
//       } catch (error) {
//         console.error('Customer creation failed:', error);
//         // Handle error state or feedback to the user
//       }
//     } else {
//       seterrmsg('* All Fields are mandatory');
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         padding: 10,
//       }}>
//       <TopHeader headerText={labels.addNewCustomer} />
//       <View style={{width: '95%'}}>
//         <View style={{marginVertical: 15}}>
//           <View style={{width: '22%'}}>
//             {imageURL ? (
//               <Image
//                 source={{uri: `data:image/jpeg;base64,${imageURL}`}}
//                 style={{height: 80, width: 80, borderRadius: 10}}
//               />
//             ) : (
//               <TouchableOpacity
//                 onPress={handleImagePicker}
//                 style={{
//                   borderWidth: 3,
//                   borderColor: '#ababab',
//                   height: 80,
//                   width: 80,
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                 }}>
//                 <CustomIcon
//                   name={'image'}
//                   size={56}
//                   color="#ababab"
//                   type={'OctIcon'}
//                 />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//         <View style={{marginVertical: 15}}>
//           <TextInput
//             placeholder="Enter Customer Name"
//             placeholderTextColor="#000"
//             onChangeText={value => handleInputChange('name', value)}
//             value={formData.name}
//             style={{
//               borderWidth: 2,
//               borderRadius: 10,
//               borderColor: '#ababab',
//               paddingLeft: 15,
//               marginBottom: 10,
//               color:"#000"

//             }}
//           />
//           <TextInput
//             placeholder="Enter Mobile Number"
//             placeholderTextColor="#000"
//             onChangeText={value => handleInputChange('phone', value)}
//             value={formData.phone}
//             style={{
//               borderWidth: 2,
//               borderRadius: 10,
//               borderColor: '#ababab',
//               paddingLeft: 15,
//               marginBottom: 10,
//               color:"#000"

//             }}
//           />
//           <TextInput
//             placeholder="Enter Address"
//             placeholderTextColor="#000"
//             onChangeText={value => handleInputChange('address', value)}
//             value={formData.address}
//             style={{
//               borderWidth: 2,
//               borderRadius: 10,
//               borderColor: '#ababab',
//               paddingLeft: 15,
//               marginBottom: 10,
//               color:"#000"

//             }}
//           />
//         </View>
//         {errmsg && <Text style={{color: 'red', padding: 10}}>{errmsg}</Text>}
//         <View style={{marginBottom: 15}}>
//           <TouchableOpacity
//             onPress={handleSubmit}
//             style={{
//               backgroundColor: '#8F62FF',
//               padding: 10,
//               alignItems: 'center',
//               borderRadius: 5,
//             }}>
//             <Text style={{color: 'white', fontSize: 18}}>Create Customer</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default AddCustomers;


import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity, Pressable} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import CustomIcon from '../../utils/icons';
import {TopHeader} from '../../components/commonComponents';
import {labels} from '../../utils/labels';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../utils/theme/colors';
import { api } from '../../../envfile/api';



const AddCustomers = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result && result.assets && result.assets.length > 0) {
        const base64 = result.assets[0].base64!;
        setImageURL(base64);
      }
    } catch (error) {
      console.error('Image picking error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setCurrentUser(email ?? undefined); // Handle null case
        console.log(currentUser, 'asdfghjkl');

        console.log('Retrieved email:', email);
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    };

    fetchEmail();
  }, []);

  const [errmsg, seterrmsg] = useState<string | undefined>(undefined);
  const handleSubmit = async () => {
    const {name, phone, address} = formData;
    if (name !== '' && phone !== '' && address !== '') {
      try {
        const response = await axios.post(api+
          '/api/customer/customercreate',
          {
            customerName: name,
            mobileNumber: phone,
            address: address,
            creator: currentUser, // Replace with the actual creator ID or logic
          },
        );
        setFormData({
          name: '',
          phone: '',
          address: '',
        });

        console.log('Customer creation successful:', response.data);
 
        // Assuming you navigate to the CustomerDetails screen upon successful submission
      } catch (error) {
        console.error('Customer creation failed:', error);
        // Handle error state or feedback to the user
      }
    } else {
      seterrmsg('* All Fields are mandatory');
    }
  };

  return (
    <View 
      style={{
        flex: 1,  
        flexDirection:"column",
        display:"flex",
        width:wp("100%"),
        padding: 10,
        // alignItems:"center"
      
      }}>
      <TopHeader headerText={labels.addNewCustomer} />
      <View style={{ width:wp("95%"),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <View style={{paddingTop: 20,width:"100%",display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <View style={{flexDirection:"row",display:"flex",justifyContent:"space-between",alignItems:"center",width:wp("90%"),backgroundColor:"#fff",borderRadius:10,padding:10}}>
            {imageURL ? (
              <View style={{flexDirection:"row",gap:15,alignItems:"center"}}>
              <Image
                              source={{uri: `data:image/jpeg;base64,${imageURL}`}}
                              style={{height: 80, width: 80, borderRadius: 10}}
                            />
                            <View style={{flexDirection:"column",gap:5}}>
                <Text style={{color:"#000"}}>Customer Image <Text style={{color:"red"}}>*</Text></Text>
                <Text style={{color:"#000"}}>Size Should be below 4MB</Text>
               
                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                <Pressable style={{backgroundColor: colors.blueFive,padding:5,borderRadius:5,}}   onPress={handleImagePicker}>
                  <Text style={{color:"#fff"}}>Upload Image</Text>
                </Pressable>
                <Pressable onPress={() => { setImageURL(undefined);  }}>
                  <Text style={{color:"red"}}>Delete</Text>
                </Pressable>
                  </View>
              </View>
                            </View>
            ) : (
              <View style={{flexDirection:"row",gap:15,alignItems:"center"}}>
                <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  borderWidth: 3, 
                  borderColor: '#ababab',
                  height: 80,
                  width: 80,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <CustomIcon
                  name={'image'}
                  size={46

                  }
                  color="#ababab"
                  type={'OctIcon'}
                />
              </TouchableOpacity>
              <View style={{flexDirection:"column",gap:5}}>
                <Text style={{color:"#000"}}>Customer Image <Text style={{color:"red"}}>*</Text></Text>
                <Text style={{color:"#000"}}>Size Should be below 4MB</Text>
               
                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                <Pressable style={{backgroundColor: colors.blueFive,padding:5,borderRadius:5,}}   onPress={handleImagePicker}>
                  <Text style={{color:"#fff"}}>Upload Image</Text>
                </Pressable>
                <Pressable onPress={() => { setImageURL(undefined);  }}>
                  <Text style={{color:"red"}}>Delete</Text>
                </Pressable>
                  </View>
              </View>
              </View>

            )}
          </View>
        </View>
        <View style={{paddingTop:5,flexDirection:"column",gap:10,width:"95%",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <View style={{flexDirection:"column",gap:5,width:"100%"}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>Customer Name</Text>
           <View style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
           <TextInput
            placeholder="Enter Customer Name"
            onChangeText={value => handleInputChange('name', value)}
            value={formData.name}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#ababab', 
              paddingLeft: 15,
              paddingBottom: 10,
              color:"#000",
              width:"100%"

            }}
          />
           </View>
          </View>
          <View style={{flexDirection:"column",gap:5,width:"100%"}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>Mobile Number</Text>
          <TextInput
            placeholder="Enter Mobile Number"
            onChangeText={value => handleInputChange('phone', value)}
value={formData.phone}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#ababab',
              paddingLeft: 15,
              paddingBottom: 10,
            }}
          />
          </View>
          <View style={{flexDirection:"column",gap:5,width:"100%"}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>Address</Text>
          <TextInput
            placeholder="Enter Address"
            onChangeText={value => handleInputChange('address', value)}
            value={formData.address}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#ababab', 
              paddingLeft: 15,
              paddingBottom: 10,
            }}
          />
          </View>
        </View>
        {errmsg && <Text style={{color: 'red', padding: 10}}>{errmsg}</Text>}
        <View style={{paddingBottom: 15,width:"100%",flexDirection:"row",justifyContent:"center",paddingTop:15}}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#8F62FF',
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
              width:"50%"
            }}>
            <Text style={{color: 'white',fontSize: 18}}>Create Customer</Text>
          </TouchableOpacity>    
        </View>
      </View>
    </View>
  );
};

export default AddCustomers;