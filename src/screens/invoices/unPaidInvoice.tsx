import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  _id: string;
  ShopName: string;
  shopAddress: string;
  mobNum1: string;
  mobNum2: string;
  creator: string;
  customerName: string;
  pendingAmount: string;
  grossAmount: string;
  totalAmount: string;
  paidstatus: string;
  paidamount: string;
  billNo: string;
  Invoice: {
    productId: string;
    productName: string;
    sellingPrice: number;
    quantity: number;
    totalPrice: number;
    bag: number;
  }[];
  creationTime: Date;
};

const UnPaidInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchCustomers();
    fetchInvoices();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${api}/api/customer/getcustomerdetails`);
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${api}/api/invoice/getInvoice`);
      setInvoices(response.data.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const updatePaidStatus = async (id: string) => {
    try {
      console.log(id,"id-inv");
      
     const response = await axios.post(api+`/api/invoice/updatePaidStatus/`,{id});
     console.log(response,"response");
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === id ? { ...invoice, paidstatus: 'Paid' } : invoice
        )
      );
    } catch (error) {
      console.error('Error updating paid status:', error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#cccccc', width: '100%', padding: 10 }}>
      <View style={{ gap: 10,paddingBottom:20 }}>
        {invoices.filter((invoice) => invoice.paidstatus === 'UnPaid').map((invoice) => (
          <View key={invoice._id} style={{ padding: 10, backgroundColor: '#fff', gap: 20, borderRadius: 8 }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20 }}>INVOICE</Text>
                <Text style={{ fontWeight: '500', color: '#3385ff', fontSize: 14, textAlign: 'left' }}>
                  #INV-{invoice.billNo}
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', color: '#196', fontSize: 20 }}>{invoice.ShopName}</Text>
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text>Date: {new Date(invoice.creationTime).toLocaleDateString()}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '55%', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 14, color: '#000' }}>{invoice.ShopName}</Text>
                <Text style={{ fontSize: 10, color: '#737373' }}>{invoice.shopAddress}</Text>
                <Text style={{ fontSize: 10, color: '#737373' }}>{invoice.mobNum1}</Text>
                <Text style={{ fontSize: 10, color: '#737373' }}>{invoice.mobNum2}</Text>
              </View>
              <View style={{ width: '45%', backgroundColor: '#fff' }}>
                {customers.filter((customer) => customer.customerName === invoice.customerName).map((customer) => (
                  <View key={customer._id}>
                    <Text style={{ fontSize: 14, color: '#000' }}>{customer.customerName}</Text>
                    <Text style={{ fontSize: 10, color: '#737373' }}>{customer.address}</Text>
                    <Text style={{ fontSize: 10, color: '#737373' }}>{customer.mobileNumber}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  gap: 5,
                  padding: 10,
                  backgroundColor: '#e6e6e6',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                <View style={{ width: '35%' }}>
                  <Text style={{ color: '#737373' }}>Particulars</Text>
                </View>
                <View style={{ width: '15%' }}>
                  <Text style={{ textAlign: 'center', color: '#737373' }}>Rate</Text>
                </View>
                <View style={{ width: '15%' }}>
                  <Text style={{ textAlign: 'center', color: '#737373' }}>Quantity</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={{ textAlign: 'center', color: '#737373' }}>Bag</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', color: '#737373' }}>Amount</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderWidth: 2,
                  borderColor: '#e6e6e6',
                  borderBottomWidth: 0,
                }}
              >
                {invoice.Invoice.map((product, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', width: '100%', gap: 5, padding: 10, borderBottomWidth: 2, borderColor: '#e6e6e6' }}
                  >
                    <View style={{ width: '35%' }}>
                      <Text style={{ color: '#000' }}>{product.productName}</Text>
                    </View>
                    <View style={{ width: '15%' }}>
                      <Text style={{ textAlign: 'center', color: '#000' }}>{product.sellingPrice}</Text>
                    </View>
                    <View style={{ width: '15%' }}>
                      <Text style={{ textAlign: 'center', color: '#000' }}>{product.quantity}</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                      <Text style={{ textAlign: 'center', color: '#000' }}>{product.bag}</Text>
                    </View>
                    <View style={{ width: '25%' }}>
                      <Text style={{ textAlign: 'center', color: '#000' }}>{product.sellingPrice * product.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
              <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/unpaid.jpg')} style={{ height: hp(8), width: wp(20) }} />
              </View>
              <View style={{ width: '40%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 5 }}>
                <View>
                  <Text style={{ color: '#000' }}>Pending Amount</Text>
                </View>
                <View>
                  <Text style={{ color: '#000' }}>Paid Amount</Text>
                </View>
                <View>
                  <Text style={{ color: '#000' }}>Total Amount</Text>
                </View>
              </View>
              <View style={{ width: '20%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 5 }}>
                <View>
                  <Text style={{ color: '#000' }}>{invoice.pendingAmount}</Text>
                </View>
                <View>
                  <Text style={{ color: '#000' }}>{invoice.paidamount}</Text>
                </View>
                <View>
                  <Text style={{ color: '#000' }}>{invoice.totalAmount}</Text>
                </View>
              </View>
            </View>
            <Pressable
              onPress={() => updatePaidStatus(invoice._id)}
              style={{ width: '100%', backgroundColor: 'green', padding: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: 5 }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Change status to Paid</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UnPaidInvoice;

const styles = StyleSheet.create({});
