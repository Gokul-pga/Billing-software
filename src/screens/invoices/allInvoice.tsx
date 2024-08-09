import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { api } from '../../../envfile/api';

type Customer = {
  _id: string;
  customerName: string;
  address: string;
  mobileNumber: string;
  creator: string;
  creationTime: string;
  lastModified: string;
  __v: number;
  pendingAmount: string;
};
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
      billNo:string, // Ensure billNo is set correctly
      Invoice: string,
      creationTime:Date,
};

type Product = {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is now a base64 string
  count: number; // Add count property
  quantity: string; // Change to string to handle TextInput value
  bag: string;
};

const AllInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoice, setInvoice] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchCustomers();
    fetchInvoices();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(api+
        '/api/customer/getcustomerdetails',
      );
      setCustomers(response.data.data); // Ensure response data is correctly set
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

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
    <ScrollView style={{ backgroundColor: '#cccccc', width: '100%', padding: 10, }}>
      <View style={{ gap: 10,paddingBottom:20 }}>
      {invoice.map((item, id) => (
          <View key={id} style={{ padding: 10, backgroundColor: '#fff', gap: 15,borderRadius:8 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20 }}>
                  INVOICE
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    color: '#3385ff',
                    fontSize: 14,
                    textAlign: 'left',
                  }}>
                  #INV-{item.billNo}
                  </Text>
              </View>

              <View style={{}}>
                <Text style={{ fontWeight: 'bold', color: '#196', fontSize: 20 }}>
                  {item.ShopName}
                </Text>
              </View>
            </View>

<View style={{width:"100%",flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}>
  <Text>Date : {new Date(item.creationTime).toLocaleDateString()}</Text>
</View>
        
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}>
              <View style={{ width: '55%', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 14, color: "#000" }}>{item.ShopName}
                </Text>
                <Text style={{ fontSize: 10, color: "#737373" }}>{item.shopAddress}
                </Text>
                <Text style={{ fontSize: 10, color: "#737373" }}>{item.mobNum1}
                </Text>
                <Text style={{ fontSize: 10, color: "#737373" }}>{item.mobNum2}
                </Text>
              </View>
              <View  style={{ width: '45%', backgroundColor: '#fff' }}>
                {customers.filter((index) => index.customerName === item.customerName).map((index) => (
                  <View key={index._id}>
                    <Text style={{ fontSize: 14, color: "#000" }}>{index.customerName}</Text>
                    <Text style={{ fontSize: 10, color: "#737373" }}>{index.address}</Text>
                    <Text style={{ fontSize: 10, color: "#737373" }}>{index.mobileNumber}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', width: '100%', gap: 5, padding: 10, backgroundColor: "#e6e6e6", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <View style={{ width: '35%' }}>
                  <Text style={{ color: "#333333" }}>Particulars</Text>
                </View>
                <View style={{ width: '15%' }}>
                  <Text style={{ textAlign: 'center', color: "#333333" }}>Rate</Text>
                </View>
                <View style={{ width: '15%' }}>
                  <Text style={{ textAlign: 'center', color: "#333333" }}>Quantity</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={{ textAlign: 'center', color: "#333333" }}>Bag</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', color: "#333333" }}>Amount</Text>
                </View>
              </View>
              <View style={{ backgroundColor: "#fff", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 2, borderColor: "#e6e6e6", borderBottomWidth: 0 }}>
                {item.Invoice.map((product, id) => (
                  <View key={id} style={{ flexDirection: 'row', width: '100%', gap: 5, padding: 10, borderBottomWidth: 2, borderColor: "#e6e6e6", }}>
                    <View style={{ width: '35%' }}>
                      <Text style={{ color: "#333333" }}>{product.productName}</Text>
                    </View>
                    <View style={{ width: '15%' }}>
                      <Text style={{ textAlign: 'center', color: "#333333" }}>{product.sellingPrice}</Text>
                    </View>
                    <View style={{ width: '15%' }}>
                      <Text style={{ textAlign: 'center', color: "#333333" }}>{product.quantity}</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                      <Text style={{ textAlign: 'center', color: "#333333" }}>{product.bag}</Text>
                    </View>
                    <View style={{ width: '25%' }}>
                      <Text style={{ textAlign: 'center', color: "#333333" }}>{product.sellingPrice * product.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",width:"100%",}}>
          <View style={{width:"40%",justifyContent:"center",alignItems:"center"}}>
            {item.paidstatus == "Paid" ? (<Image
            source={require('../../../assets/images/paid.png')}
            style={{height: hp(8), width: wp(20)}}
          />) : (<Image
            source={require('../../../assets/images/unpaid.jpg')}
            style={{height: hp(8), width: wp(20)}}
          />)}
          
          </View>
            <View style={{width:"40%",flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end",gap:5}}>
           <View>
                <Text>Pending Amount</Text>
              </View>
              <View>
                <Text>Paid Amount</Text>
              </View>
              <View>
                <Text>Total Amount</Text>
              </View>
            </View>
            <View style={{width:"20%",flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end",gap:5,}}>

           <View>
                <Text style={{color:"#000"}}>{item.pendingAmount}</Text>
              </View>
              <View>
                <Text style={{color:"#000"}}>{item.paidamount}</Text>
              </View>
              <View>
                <Text style={{color:"#000"}}>{item.totalAmount}</Text>
              </View>
            </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllInvoice;

const styles = StyleSheet.create({});
