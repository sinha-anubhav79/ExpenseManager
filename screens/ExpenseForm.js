import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

function ExpenseForm() {
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState(null);
  const paymentModes = [
    'Account',
    'Amazon-Pay',
    "Bank's App",
    'BHIM UPI',
    'Cash',
    'Credit Card',
    'Debit Card',
    'Google-Pay',
    'Net Banking',
    'PayTM Wallet',
    'PayTM UPI',
    'PhonePe Wallet',
    'PhonePe UPI',
    'Samsung-Pay',
  ];
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formatedDate =
    (day < 10 ? '0' : '') +
    day.toString() +
    '.' +
    (month < 10 ? '0' : '') +
    month.toString() +
    '.' +
    year.toString();

  async function handleClick(event) {
    // event.preventDefault();
    const inputData = {
      day: day,
      month: month,
      year: year,
      description: description,
      amount: amount,
      mode: paymentMode,
    };
    console.log(inputData);
  }
  return (
    <View>
      <SafeAreaView>
        <Text style={styles.heading}>Enter Expense</Text>
        <Text style={styles.label}>Date</Text>
        <TouchableHighlight onPress={() => setOpen(true)}>
          <View style={styles.datepicker}>
            <Text>{formatedDate}</Text>
          </View>
        </TouchableHighlight>
        <View>
          {open && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Description of expense"
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          value={amount}
          keyboardType="numeric"
          placeholder="Ex. 1024"
        />
        <Text style={styles.label}>Mode of payment</Text>
        <SelectDropdown
          data={paymentModes}
          onSelect={(selectedItem, index) => {
            setPaymentMode(selectedItem);
          }}
          defaultButtonText="---Select---"
          buttonTextAfterSelection={() => paymentMode}
          rowTextForSelection={(item, index) => item}
          buttonStyle={styles.dropDownButton}
          buttonTextStyle={styles.dropDownButtonText}
        />
        <View style={styles.submit}>
          <Button onPress={() => handleClick()} title="Submit" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 350,
    marginHorizontal: 12,
    padding: 10,
    borderBottomWidth: 0.2,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 50,
  },
  label: {
    paddingHorizontal: 10,
    marginHorizontal: 12,
    marginTop: 15,
    fontWeight: 'bold',
  },
  submit: {
    width: 300,
    padding: 20,
    margin: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  datepicker: {
    width: 300,
    padding: 10,
    marginHorizontal: 12,
  },
  dropDownButton: {
    width: 200,
    backgroundColor: 'white',
  },
  dropDownButtonText: {
    fontSize: 15,
  },
});

export default ExpenseForm;
