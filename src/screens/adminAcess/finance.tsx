import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, Button, Platform } from 'react-native';
import axios from 'axios';
import { api } from '../../../envfile/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Finance = () => {
  const [outgoingCash, setOutgoingCash] = useState(0);
  const [borrowingCash, setBorrowingCash] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [closingAmount, setClosingAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [outgoingCashInput, setOutgoingCashInput] = useState('');
  const [borrowingCashInput, setBorrowingCashInput] = useState('');
  const [todayIncomeInput, setTodayIncomeInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState(''); // State to hold error messages
  const [isToday, setIsToday] = useState(true); // State to check if selected date is today


  const [OutCash,setOutCash] = useState(false);
  const [BorrowCash,setBorrowCash] = useState(false);
  const [Income, setIncome] = useState(false);
  const [Close, setClose] = useState(false);

  const OutCashF = ()=>{
     setOutCash(!OutCash);
     setBorrowCash(false);
     setIncome(false);
     setClose(false);
  }
  const BorrowCashF = ()=>{
     setOutCash(false);
     setBorrowCash(!BorrowCash);
     setIncome(false);
     setClose(false);
  }
  const IncomeF = ()=>{
     setOutCash(false);
     setBorrowCash(false);
     setIncome(!Income);
     setClose(false);
  }
  const CloseF = ()=>{
     setOutCash(false);
     setBorrowCash(false);
     setIncome(false);
     setClose(!Close);
  }

  useEffect(() => {
    const currentDate = new Date();
    const isSelectedDateToday =
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();
    setIsToday(isSelectedDateToday);
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    setError(''); // Reset error state before fetching data
    try {
      // Ensure date is in the format YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split('T')[0];
      
      const response = await axios.get(api + "/api/cashflow/getHistoricalData", {
        params: { date: formattedDate }
      });
  
      if (response.data.status === "ok") {
        const fetchedCashFlow = response.data.cashFlow;
        setOutgoingCash(fetchedCashFlow.outgoingCash || 0);
        setBorrowingCash(fetchedCashFlow.borrowingCash || 0);
        setTodayIncome(fetchedCashFlow.todaysIncome || 0);
        setClosingAmount(fetchedCashFlow.closingAmount || 0);
  
        const newGrandTotal = (fetchedCashFlow.todaysIncome || 0) +
                              (fetchedCashFlow.closingAmount || 0) +
                              (fetchedCashFlow.totalBorrowing || 0) -
                              (fetchedCashFlow.totalOutgoing || 0);
        setGrandTotal(newGrandTotal);
        
      } else {
        // Handle case where no data is found
        setOutgoingCash(0);
        setBorrowingCash(0);
        setTodayIncome(0);
        setClosingAmount(0);
        setGrandTotal(0);
        setError("No cash flow data available for the selected date.");
      }
    } catch (error) {
      setError("No data Found for This Date.");
      // Ensure state is set to zero if there's an error
      setOutgoingCash(0);
      setBorrowingCash(0);
      setTodayIncome(0);
      setClosingAmount(0);
      setGrandTotal(0);
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  const handleCashSubmit = async (type) => {
    const numericValue = parseFloat(
      type === "outgoing" ? outgoingCashInput : borrowingCashInput
    );

    if (!isNaN(numericValue) && numericValue > 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateCashFlow", {
          amount: numericValue,
          type: type,
          date: selectedDate
        });

        if (response.data.status === "ok") {
          const updatedCashFlow = response.data.cashFlow;
          setOutgoingCash(updatedCashFlow.totalOutgoing);
          setBorrowingCash(updatedCashFlow.totalBorrowing);

          const newGrandTotal = todayIncome +
                                closingAmount +
                                updatedCashFlow.totalBorrowing -
                                updatedCashFlow.totalOutgoing;
          setGrandTotal(newGrandTotal);

          if (type === "outgoing") {
            setOutgoingCashInput("");
          } else {
            setBorrowingCashInput("");
          }
        } else {
          setError("Failed to update cash flow on server.");
        }
      } catch (error) {
        setError("Error submitting cash flow.");
      }
    } else {
      setError("Invalid input. Please enter a positive number.");
    }

    if(type === 'outgoing'){
      setOutCash(false)
 }
 if(type === 'borrowing'){
      setBorrowCash(false)
 }
  };

  const handleIncomeSubmit = async () => {
    const incomeValue = parseFloat(todayIncomeInput);

    if (!isNaN(incomeValue) && incomeValue >= 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateIncome", {
          todayIncome: incomeValue,
          date: selectedDate
        });

        if (response.data.status === "ok") {
          const updatedIncome = response.data.todaysIncome;
          setTodayIncome(updatedIncome);

          const newGrandTotal = updatedIncome + closingAmount + borrowingCash - outgoingCash;
          setGrandTotal(newGrandTotal);

          setTodayIncomeInput('');
        } else {
          setError("Failed to update today's income on server.");
        }
      } catch (error) {
        setError("Error submitting today's income.");
      }
    } else {
      setError("Invalid income. Please enter a valid number.");
    }
    setIncome(!Income);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <ScrollView>
    <View style={{width:wp("100%"),flexDirection: "column",display: "flex",justifyContent: "center",flex: 1,alignItems: "center",gap:25}}>
      
        <View style={{width:wp("90%"),flexDirection: "column",display: "flex",justifyContent: "center",alignItems: "center",gap: 20,paddingTop:15}}>
        <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems:"center"}}>
          <View>

          </View>
          <View>
             {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
          </View>
   <Pressable onPress={() => setShowDatePicker(true)} style={{backgroundColor:"#743BFF",borderRadius:27,padding:10,alignItems:"center"}}>
   <MaterialCommunityIcons name="calendar-month" size={24} color="#fff" />
   </Pressable>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    

          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Closing Amount</Text>
             <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
             <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{closingAmount}</Text>
             {/* <Pressable onPress={()=>CloseF()}>
             <FontAwesome name="edit" size={hp(2.5)} color="black" />
             </Pressable> */}
             </View>
          </View>
          
         
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Today's Income</Text>
              <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{todayIncome}</Text>
              <Pressable onPress={()=>IncomeF()}>
             <FontAwesome name="edit" size={hp(2.5)} color="black" />
             </Pressable>
              </View>
          </View>

          {
            (Income && isToday) &&  <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
            <Text style={{color:"#743BFF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Today's Income</Text>
    
              <TextInput
                placeholder="Enter Today's Income"
                keyboardType="numeric"
                value={todayIncomeInput}
                onChangeText={handleInputChange(setTodayIncomeInput)}
                style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20}}
              />
              <Pressable onPress={handleIncomeSubmit} style={{backgroundColor: "#743BFF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
                <Text>Submit Today's Income</Text>
              </Pressable>
            </View>
          }


          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Outgoing Amount</Text>
              <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{outgoingCash}</Text>
              <Pressable onPress={()=>OutCashF()}>
             <FontAwesome name="edit" size={hp(2.5)} color="black" />
             </Pressable>
              </View>
          </View>

           {
            (OutCash && isToday) &&  <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
            <Text style={{color:"#743BFF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Outgoing Cash</Text>
            <TextInput
              placeholder="Enter Outgoing Cash"
              keyboardType="numeric"
              value={outgoingCashInput}
              onChangeText={handleInputChange(setOutgoingCashInput)}
              style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20,color:"#000"}}/>
            <Pressable onPress={() => handleCashSubmit('outgoing')} style={{backgroundColor: "#743BFF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
              <Text>Submit Outgoing Cash</Text>
            </Pressable>
          </View> 
           }
      
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Borrowing Cash</Text>
              <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{borrowingCash}</Text>
              <Pressable onPress={()=>BorrowCashF()}>
             <FontAwesome name="edit" size={hp(2.5)} color="black" />
             </Pressable>
              </View>
          </View>
        </View>

        {
          (BorrowCash && isToday) &&  <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
          <Text style={{color:"#743BFF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Borrowing Cash</Text>
            <TextInput
              placeholder="Enter Bor  rowing Cash"
              keyboardType="numeric"
              value={borrowingCashInput}
              onChangeText={handleInputChange(setBorrowingCashInput)}
              style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20}}
            />
            <Pressable onPress={() => handleCashSubmit('borrowing')} style={{backgroundColor: "#743BFF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
              <Text>Submit Borrowing Cash</Text>
            </Pressable>
          </View>
        }


           
        <View style={{width:wp("90%"),display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:9,backgroundColor:"#743BFF",padding:20,gap:20}}>
             <Text style={{color:"#fff",fontSize:hp(1.9),fontWeight:"bold"}}>GRAND TOTAL :</Text>
             <Text style={{color:"#fff",fontSize:hp(2.1),fontWeight:"bold"}}>{grandTotal}</Text>
        </View>
 

       

       
     

        <View>
          
         
        
        </View>

       
        

       

       
      </View>
              </ScrollView>
              );
              };
              
              const styles = StyleSheet.create({
              container: {
              alignItems: 'center',
              padding: 20,
              },
              // datePickerContainer: {
              // marginBottom: 20,
              // },
              cardContainer: {
              width: wp('90%'),
              // marginBottom: 20,
              },
              card: {
              width: wp('90%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 5,
              padding: 10,
              // marginBottom: 10,
              },
              cardTitle: {
              color: '#743BFF',
              fontWeight: 'bold',
              fontSize: hp(1.9),
              },
              cardValue: {
              color: '#743BFF',
              fontWeight: 'bold',
              fontSize: hp(1.9),
              },
              inputContainer: {
              width: wp('100%'),
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
              },
              inputLabel: {
              color: '#743BFF',
              fontWeight: 'bold',
              fontSize: hp(2.2),
              },
              input: {
              borderColor: '#c8d2d5',
              backgroundColor: '#e6e9e9',
              borderWidth: 2,
              width: '90%',
              height: 50,
              borderRadius: 10,
              paddingHorizontal: 20,
              color: '#000',
              },
              button: {
              backgroundColor: '#8F62FF',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              },
              buttonText: {
              color: '#fff',
              },
              errorText: {
              color: 'red',
              fontWeight: 'bold',
              fontSize: hp(2),
              textAlign: 'center',
              marginBottom: 20,
              },
              });
              
              export default Finance;