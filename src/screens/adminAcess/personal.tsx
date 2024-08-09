import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';

import FinanceScreen from './finance';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StockUpdate from './stockupdate';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const PersonalScreen = () => {
  const navigation = useNavigation();

  function tab() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: '#000',
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {route.name}
            </Text>
          ),
        })}>
        <Tab.Screen name="finance" component={FinanceScreen} />
        <Tab.Screen name="stockupdate" component={StockUpdate} />
      </Tab.Navigator>
    );
  }

  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#8a42f5',
          height: '7%',
          padding: 20,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
      </View>
      {tab()}
    </View>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({});
