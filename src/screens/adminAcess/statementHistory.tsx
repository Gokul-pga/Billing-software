import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api } from '../../../envfile/api';

type Invoice = {
  ShopName:string,
      shopAddress:string,
      mobNum1:string,
      mobNum2:string,
      creator:string,
      customerName: string,
      pendingAmount: string,
      grossAmount: string,
      totalAmount: string,
      paidstatus:string,
      paidamount: string,
      totalInvoicePiadAmount: string,
      billNo:string, // Ensure billNo is set correctly
      Invoice: string,
      creationTime:Date,
};

const StatementHistory = () => {
    const navigation = useNavigation();
    const [totalPaidAmount, settotalPaidAmount] = useState();

  useEffect(() => {
    fetchTotalPAidAmount();
    fetchInvoices();
  }, [])
  

    const fetchTotalPAidAmount = async () => {
      try {
        const response = await axios.get(api+
          '/api/invoice/totalpaidamount',
        );
        settotalPaidAmount(response.data); 
        console.log(totalPaidAmount,"hhhhhh");
        
      } catch (error) {
        console.error('Error fetching Total PAid Amount:', error);
      }
    };

    const [invoice, setInvoice] = useState<Invoice[]>([]);
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(api+
          '/api/invoice/getInvoice',
        );
        setInvoice(response.data.data);
        console.log(invoice, "invoice");
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
  return (
    <View
      style={{
        width: wp('100%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View
        style={{
          width: wp('90%'),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap:10
        }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width:"100%",
        //   backgroundColor:"#f5f"
        }}>
          <Pressable onPress={()=>{
            navigation.goBack();
          }} style={{justifyContent: 'flex-start',
          alignItems: 'flex-start',}}>
            <CustomIcon
              color="#000"
              size={26}
              name="arrowleft"
              type="AntDesign"
            />
          </Pressable>
          
        </View>
        <View style={{gap:10}}>
        {invoice.filter((invoice) => invoice.paidstatus === 'Paid').map((item,id) => {
         return(<View
          style={{
            flexDirection: 'row',
            width: wp('95%'),
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 10,
            elevation: 5,
          }}>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>{new Date(item.creationTime).toLocaleDateString()}</Text>
            {/* <FontAwesome6 name="coins" size={24} color="black" /> */}
            <Text style={{color: '#000', fontWeight: 'bold'}}>{item.customerName}</Text>

          </View>
          
          <View style={{flexDirection: 'column', gap: 10}}>
          <View style={{flexDirection:"row",gap:5,alignItems: 'center'}}>
          <Text style={{color: 'grey'}}>Received</Text>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{color: '#000', fontWeight: 'bold'}}>₹  {item.paidamount}</Text>
              <Feather name="arrow-down-left" size={24} color="green" /></View>
            </View>
          </View>
            <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{color: 'grey'}}>Balance</Text>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ {item.totalInvoicePiadAmount}
              </Text>
            </View>
          </View>
        </View>)
      })}
        </View>
        
         <View
          style={{
            flexDirection: 'row',
            width: wp('95%'),
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 10,
            elevation: 5,
          }}>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>29-07-2024</Text>
            {/* <FontAwesome6 name="coins" size={24} color="black" /> */}
            <Text style={{color: '#000', fontWeight: 'bold'}}>Varsini</Text>

          </View>
          
          <View style={{flexDirection: 'column', gap: 10}}>
          <View style={{flexDirection:"row",gap:5,alignItems: 'center'}}>
          <Text style={{color: 'grey'}}>Debited</Text>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{color: '#000', fontWeight: 'bold'}}>₹ - 280.00</Text>
              <Feather name="arrow-up-right" size={24} color="red" /></View>
            </View>
          </View>
            <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{color: 'grey'}}>Balance</Text>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ 40,000.00
              </Text>
            </View>
          </View>
        </View>
      </View>
      
    </View>
  );
};

export default StatementHistory;

const styles = StyleSheet.create({});



// <View
//           style={{
//             flexDirection: 'row',
//             width: wp('95%'),
//             display: 'flex',
//             justifyContent: 'space-between',
//             borderRadius: 10,
//             backgroundColor: '#fff',
//             padding: 10,
//             elevation: 5,
//           }}>
//           <View
//             style={{flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
//             <Text style={{color: '#000', fontWeight: 'bold'}}>29-07-2024</Text>
//             {/* <FontAwesome6 name="coins" size={24} color="black" /> */}
//             <Text style={{color: '#000', fontWeight: 'bold'}}>Varsini</Text>

//           </View>
          
//           <View style={{flexDirection: 'column', gap: 10}}>
//           <View style={{flexDirection:"row",gap:5,alignItems: 'center'}}>
//           <Text style={{color: 'grey'}}>Received</Text>
//             <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
//               <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{color: '#000', fontWeight: 'bold'}}>₹ - 280.00</Text>
//               <Feather name="arrow-up-right" size={24} color="red" /></View>
//             </View>
//           </View>
//             <View style={{flexDirection: 'row', gap: 5}}>
//             <Text style={{color: 'grey'}}>Balance</Text>
//               <Text style={{color: '#000', fontWeight: 'bold'}}>
//                 ₹ 40,000.00
//               </Text>
//             </View>
//           </View>
//         </View>