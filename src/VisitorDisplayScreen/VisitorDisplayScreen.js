import React, {Component} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {Header} from '../Header';
const VISITOR_RECORD = 'visitor';

class VisitorDisplayScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLog: [],

      error: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.handleonFocus);
  }
  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.handleonFocus);
  }

  handleonFocus = async () => {
    let res = await AsyncStorage.getItem(VISITOR_RECORD);

    if (res) {
      let fetchedDetails = JSON.parse(res);
      this.setState({userLog: fetchedDetails});
    }
  };

  render() {
    if (this.state.error == '') {
      return (
        <React.Fragment>
          <Header
            onMenuPress={() => this.props.navigation.openDrawer()}
            title={'Visitors Log'}
          />

          <SafeAreaView style={styles.container}>
            <View style={styles.logContainer}>
              <View>
                <Text>Scroll right for more</Text>
              </View>
              <ScrollView horizontal={true} style={styles.scrollView}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={styles.logHeader}>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Name
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Email
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Visit Type
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Person to Visit
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Date
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Entr Time
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', paddingVertical: 10},
                      ]}>
                      Exit Time
                    </Text>
                  </View>
                  <FlatList
                    data={this.state.userLog}
                    renderItem={({item}) => (
                      <View style={styles.logRow}>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.nameField}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.email}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.visitType}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.personToVisit}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.dateOfEntry}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.timeOFEntry}
                        </Text>
                        <Text style={[styles.text, {paddingVertical: 5}]}>
                          {item.timeOfExit}
                        </Text>
                      </View>
                    )}
                    keyExtractor={({id}, index) => id}
                  />
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </React.Fragment>
      );
    }

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
}

export default VisitorDisplayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
    //  margin: 10,
  },
  logContainer: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1,
    //  borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  logHeader: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
  logRow: {
    flex: 0,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
  text: {
    fontSize: 15,
    color: 'black',
    width: 120,
    padding: 5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'black',
    textAlign: 'center',
  },
});
