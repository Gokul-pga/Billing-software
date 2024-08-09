import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BottomNavBar from '../../components/bottomNavBar';
import {Card} from '../../components/commonCard';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import {
  addQuickData,
  dashboardHeaderCardData,
  menuData,
} from '../../utils/data/dashboardData';
import CustomIcon from '../../utils/icons';
import {labels} from '../../utils/labels';
import {
  DashboardBackground,
  PaymentSummaryBgImage,
  ProfileImage,
} from '../../utils/png';
import {screenName} from '../../utils/screenNames';
import {
  H10Danger600,
  H10blackTwo600,
  H10green600,
  H10grey600,
  H12BlackOne600,
  H12GreyTwo400,
  H12white600,
  H12whiteOne600,
  H14blackOne600,
  H16BlackOne700,
  H16white700,
  H18BlackOne700,
  H18white700,
  H28white700,
} from '../../utils/styledComponents';
import {LayoutDashboard} from '../../utils/svg';
import {colors} from '../../utils/theme/colors';
import {
  alignItemCenter,
  alignSelfCenter,
  flexRow,
  justifyBetween,
  justifyCenter,
  mb10,
  mb15,
  mb5,
  mh15,
  ml15,
  mt10,
  mt15,
  mt5,
  mv20,
  pv10,
} from '../../utils/theme/commonStyles';
import FrequentCustomers from './frequentCustomers';
import InvoiceStatics from './invoiceStatics';
import PaymentStatics from './paymentStatics';
import QuickAccess from './quickAccess';
import RecentCustomers from './recentCustomers';
import RecentInvoices from './recentInvoices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../../envfile/api';

export type dashboardProps = {};
interface Product {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is now a base64 string
}

const DashboardScreen = (props: dashboardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, [])
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get<{data: Product[]}>(api+
        '/auth/product/getProduct',
      );
      setProducts(response.data.data); // Assuming response.data.data is an array of products
      // console.log(products,"asdfghjkl");
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  const navigation = useNavigation();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const openmenu = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
        <View>
          <Text style={{fontSize:18,fontWeight:"700",color:"#000"}}>Admin Access</Text>
        </View>
        <View style={{display:"flex",flexDirection:"column",width:"100%",gap:15}}>
          <TouchableOpacity onPress={() =>
              navigation.navigate(screenName.Personal as never)
            } style={{padding:10,borderRadius:8,display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#ebebeb"}}>
            <View style={{width:"30%"}}>
            <Text style={{fontSize:16,color:"#404040"}}>Personal</Text>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
              navigation.navigate(screenName.StatementHistory as never)
            } style={{padding:10,borderRadius:8,display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#ebebeb"}}>
            <View style={{width:"70%"}}>
            <Text style={{fontSize:16,color:"#404040"}}>Payment Survey</Text>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
                 AsyncStorage.removeItem('userToken');

            console.log("token deleted");
            navigation.navigate(screenName.LoginEmailScreen as never);

          }} style={{padding:15,borderRadius:8,flexDirection:"row",gap:5,alignItems:"center",justifyContent:"flex-start"}}>
            <Text style={{fontSize:18,color:"red"}}>Logout</Text><CustomIcon
              color="red"
              size={18}
              name="logout"
              type="AntDesign"
            />
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  const menuOptionModal = () => {
    return (
      <View>
        <View
          style={[
            {
              height: 4,
              width: 70,
              borderRadius: 10,
              backgroundColor: colors.black,
            },
            alignSelfCenter,
            mb15,
          ]}
        />
        <H18BlackOne700 style={mb10}>{labels.menu}</H18BlackOne700>
        <View
          style={[
            {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 180},
            ml15,
          ]}>
          {menuData.map(({SvgImage, id, screenName, title}) => (
            <View key={id} style={{marginHorizontal: 6, marginVertical: 6}}>
              <TouchableOpacity
                style={[
                  {
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    backgroundColor: colors.whiteThree,
                  },
                  alignItemCenter,
                  justifyCenter,
                ]}
                onPress={() => navigation.navigate(screenName as never)}>
                <SvgImage height={25} width={25} />
              </TouchableOpacity>
              <View style={[mt5]}>
                {title.includes(' ') ? (
                  title.split(' ').map((word, index) => (
                    <H10blackTwo600 key={index} style={styles.word}>
                      {word}
                    </H10blackTwo600>
                  ))
                ) : (
                  <H10blackTwo600 style={styles.word}>{title}</H10blackTwo600>
                )}
              </View>
            </View>
          ))}
        </View>
        <BottomNavBar />
      </View>
    );
  };

  const dashBoardHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={openModal}
          style={[
            {
              backgroundColor: colors.primaryThree,
              height: 32,
              width: 32,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <LayoutDashboard height={16} width={16} color={colors.white} />
        </TouchableOpacity>
        <H18white700>{labels.dashboard}</H18white700>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {/* <TouchableOpacity
            style={[
              {
                backgroundColor: colors.primaryThree,
                height: 32,
                width: 32,
                right: 10,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() =>
              navigation.navigate(screenName.NotificationScreen as never)
            }>
            <CustomIcon
              color={colors.white}
              size={16}
              name="notifications"
              type="Ionicons"
            />
            <View
              style={{
                position: 'absolute',
                left: 16,
                bottom: 20,
                width: 5,
                height: 5,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                backgroundColor: colors.danger,
              }}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Image
              source={ProfileImage}
              style={{height: 32, width: 32, borderRadius: 8}}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={openModal2}>
            <CustomIcon
              color={colors.white}
              name="menu"
              size={26}
              type="Entypo"
            />
          </TouchableOpacity>
        </View>
        <CustomModal
          children={openmenu()}
          visible={showModal2}
          onClose={closeModal2}
          height={'40%'}
        />
        <CustomModal
          children={menuOptionModal()}
          visible={showModal}
          onClose={closeModal}
          height={'80%'}
        />
      </View>
    );
  };

  const headerScrollCard = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dashboardHeaderCardData.map(
            ({
              SvgImage,
              amount,
              cardName,
              date,
              id,
              isAdd,
              iconName,
              iconType,
              percentage,
            }) => {
              return (
                <Card style={{width: 250}} key={id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                      }}>
                      <H14blackOne600>{cardName}</H14blackOne600>
                    </View>
                    <View
                      style={[
                        {
                          height: 35,
                          width: 35,
                          backgroundColor: colors.greyOne,
                          borderRadius: 8,
                        },
                        alignItemCenter,
                        justifyCenter,
                      ]}>
                      <SvgImage height={16} width={16} />
                    </View>
                  </View>
                  <View style={[pv10]}>
                    <DashedLine
                      height={230}
                      color={colors.greyTwo}
                      dashLength={10}
                      dashGap={5}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <H16BlackOne700>{amount}</H16BlackOne700>
                    <View
                      style={{
                        justifyContent: 'center',
                        backgroundColor: colors.greyOne,
                        height: 25,
                        width: 60,
                        borderRadius: 2,
                      }}>
                      {/* {isAdd ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <CustomIcon
                            color={colors.green}
                            size={12}
                            name="circle-arrow-up"
                            type="FontAwesome6"
                          />
                          <H10green600>+ {percentage}</H10green600>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                          }}>
                          <CustomIcon
                            color={colors.danger}
                            size={12}
                            name="circle-arrow-down"
                            type="FontAwesome6"
                          />
                          <H10Danger600>- {percentage}</H10Danger600>
                        </View>
                      )} */}
                    </View>
                  </View>
                </Card>
              );
            },
          )}
        </ScrollView>
      </View>
    );
  };

  const paymentSurvey = () => {
    return (
      <View
        style={[
          flexRow,
          justifyBetween,
          {
            height: 120,
            width: '100%',
            backgroundColor: colors.blackThree,
            borderRadius: 10,
          },
        ]}>
        <View style={[ml15, mt15]}>
          <H16white700>{labels.paymentSummary}</H16white700>
          <H12GreyTwo400 style={mt5}>
            View the Payment Summary {'\n'}on your Invoices
          </H12GreyTwo400>
          <TouchableOpacity
            style={[
              {
                height: 25,
                width: 100,
                backgroundColor: colors.primary,
                borderRadius: 15,
              },
              alignItemCenter,
              justifyCenter,
              mt15,
            ]}
            onPress={() =>
              navigation.navigate(screenName.PaymentSummary as never)
            }>
            <H12white600>{labels.viewSummary}</H12white600>
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={PaymentSummaryBgImage}
          style={{
            height: 120,
            width: 130,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}></ImageBackground>
      </View>
    );
  };

  const addAQuickCard = () => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10,width:"100%"}}>
        <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",width:"100%",gap:10,justifyContent:"space-between"}}>
          {addQuickData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={()=>{
                  navigation.navigate(item.moveTo)
                }}
                key={item.id}>
                <Card
                  backgroundColor={
                    index % 2 === 0 ? colors.cardColor1 : colors.cardColor2
                  }
                  style={{
                    height: 70,
                    width: 110,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={mb5}>
                    <CustomIcon
                      color={colors.blackOne}
                      name="plus"
                      size={12}
                      type="Entypo"
                    />
                  </View>
                  <Text style={{textAlign:"center",color:"#000"}}>{item.title}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor:"#fff",minHeight:"100%"}}>
      <ImageBackground
        source={DashboardBackground}
        style={[{flex: 1, height: '100%', width: '100%', paddingTop: 10}]}>
        <View style={{marginBottom: 60}}>
          <View style={{marginHorizontal: 10, flex: 1}}>
            {dashBoardHeader()}
            <View style={[mt10, mb10]}>{headerScrollCard()}</View>
          </View>
          <View
            style={{
              backgroundColor: colors.whiteTwo,
              height: '100%',
              marginTop: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={[mt10, mh15, mv20]}>
              <H16BlackOne700>{labels.addAQuick}</H16BlackOne700>
              {addAQuickCard()}
              {/* <PaymentStatics /> */}
              <FrequentCustomers />
              {/* <QuickAccess /> */}
              {/* <InvoiceStatics /> */}
              <RecentInvoices />
              {/* {paymentSurvey()}
              <RecentCustomers /> */}
            </View>
          </View>
        </View>
        <BottomNavBar />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  word: {
    lineHeight: 16, // You can adjust the line height as needed
    textAlign: 'center',
  },
});

export default DashboardScreen;
