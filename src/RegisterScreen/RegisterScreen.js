/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AppState,
  BackHandler,
  Button,
  Picker,
  AsyncStorage,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Custom from '../BackgroundTask/Custom';

import {Header} from '../Header';
const CURRENT_USER_DETAILS = 'currentValue';
const VISITOR_RECORD = 'visitor';

var today = new Date();
var date =
  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

const INITITIAL_DETAILS = {
  nameField: '',
  email: '',
  visitType: 'Meeting',
  personToVisit: '',
  dateOfEntry: date,
  timeOFEntry: '',
  timeOfExit: '',
};
class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: INITITIAL_DETAILS,
      errorsLive: [],
      choosenIndex: 0,
      visitorsRecords: [],
      registered: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    this.populateData();
  }

  populateData = async () => {
    try {
      let res = await AsyncStorage.getItem(CURRENT_USER_DETAILS);
      if (res) {
        let fetchedDetails = {...this.state.details, ...JSON.parse(res)};
        this.setState({details: fetchedDetails});
      }
    } catch (e) {}
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  commitToStore = async () => {
    try {
      await AsyncStorage.setItem(
        CURRENT_USER_DETAILS,
        JSON.stringify(this.state.details),
      );
    } catch (e) {}
  };

  handleAppStateChange = (nextAppState) => {
    //Sets when App is killed or in background
    if (nextAppState === 'background') {
      this.commitToStore();
      Custom.startService(); //Starts notification background
    } else {
      Custom.stopService(); // Stops notification  display once foreground
    }
  };

  //passes by validation
  checkForRecord = () => {
    if (this.validate(this.state.details)) {
      this.recordVisitor();
    }
  };

  //Displays erroos listed
  renderErrors = () => {
    setTimeout(() => this.setState({errorsLive: []}), 3000);

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          //  alignItems: 'center',
          marginVertical: 10,
        }}>
        {this.state.errorsLive.map((txt) => (
          <Text style={{color: 'red'}}>{txt}</Text>
        ))}
      </View>
    );
  };

  //Records to the store
  recordVisitor = async () => {
    try {
      let res = await AsyncStorage.getItem(VISITOR_RECORD);

      if (res) {
        let fetchRecord = [...JSON.parse(res), this.state.details];
        console.log('List', fetchRecord);
        await AsyncStorage.setItem(
          VISITOR_RECORD,
          JSON.stringify(fetchRecord),
          () => alert('Entry recorded'),
        );
      } else {
        await AsyncStorage.setItem(
          VISITOR_RECORD,
          JSON.stringify([this.state.details]),
          () => alert('Entry recorded'),
        );
      }

      this.setState({
        details: INITITIAL_DETAILS,
        errorsLive: [],
      });
    } catch (e) {}
  };

  //Validaatios
  validate = (details) => {
    let errors = [];
    if (details.nameField == '') {
      errors.push('Please enter your name');
    }

    if (
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        details.email,
      ) == false
    ) {
      errors.push('Please enter valid email address with @');
    }

    if (details.personToVisit == '') {
      errors.push('Please enter person to visitl');
    }

    if (details.timeOFEntry == '') {
      errors.push('Please enter entry time');
    }
    if (details.timeOFEntry == '') {
      errors.push('Please enter expected exit');
    }

    if (errors.length > 0) {
      this.setState({errorsLive: errors});

      return false;
    }
    return true;
  };

  //Testtt
  render() {
    return (
      <React.Fragment>
        <Header
          onMenuPress={() => this.props.navigation.openDrawer()}
          title={'Register'}
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              padding: 10,
              paddingTop: 30,
              backgroundColor: 'beige',
            }}>
            <Row
              label={'Name'}
              secondComp={
                <TextInput
                  value={this.state.details.nameField}
                  style={{
                    width: '85%',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 40,
                  }}
                  onChangeText={(txt) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, nameField: txt},
                    }))
                  }
                  placeholder={'Enter name'}
                />
              }
            />
            <Row
              label={'Email'}
              secondComp={
                <TextInput
                  value={this.state.details.email}
                  style={{
                    width: '85%',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 40,
                  }}
                  placeholder={'Enter email '}
                  onChangeText={(txt) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, email: txt},
                    }))
                  }
                />
              }
            />
            <Row
              label={'Type of visit'}
              secondComp={
                <Picker
                  mode={'dropdown'}
                  style={styles.pickerStyle}
                  selectedValue={this.state.details.visitType}
                  onValueChange={(itemValue, itemPosition) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, visitType: itemValue},
                      choosenIndex: itemPosition,
                    }))
                  }>
                  <Picker.Item label="Meeting" value="Meeting" />
                  <Picker.Item label="Delivery" value="Delivery" />
                  <Picker.Item label="Personal" value="Personal" />
                </Picker>
              }
            />
            <Row
              label={'Person to visit'}
              secondComp={
                <TextInput
                  value={this.state.details.personToVisit}
                  style={{
                    width: '85%',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 40,
                  }}
                  placeholder={'Enter nanme person to visit '}
                  onChangeText={(txt) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, personToVisit: txt},
                    }))
                  }
                />
              }
            />
            <Row label={'Date of entry'} secondComp={<Text>{date}</Text>} />
            <Row
              label={'Time of entry'}
              secondComp={
                <TextInput
                  value={this.state.details.timeOFEntry}
                  style={{
                    width: '85%',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 40,
                  }}
                  onChangeText={(txt) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, timeOFEntry: txt},
                    }))
                  }
                  placeholder={'say your entry time'}
                />
              }
            />
            <Row
              label={'Time of exit'}
              secondComp={
                <TextInput
                  value={this.state.details.timeOfExit}
                  style={{
                    width: '85%',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 40,
                  }}
                  onChangeText={(txt) =>
                    this.setState((prevState) => ({
                      details: {...prevState.details, timeOfExit: txt},
                    }))
                  }
                  placeholder={'Say your exit time'}
                />
              }
            />

            {this.state.errorsLive.length > 0 ? this.renderErrors() : null}
            <View style={{marginTop: 20}}>
              <Button onPress={() => this.checkForRecord()} title="Register" />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const Row = ({label, secondComp}) => (
  <View style={{height: 60, flexDirection: 'row'}}>
    <View
      style={{
        borderWidth: 1,
        borderColor: 'orange',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{label}</Text>
    </View>
    <View
      style={{
        borderWidth: 1,
        borderColor: 'orange',
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {secondComp}
    </View>
  </View>
);

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 150,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
});

/*


*/
