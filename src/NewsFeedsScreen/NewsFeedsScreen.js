import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  Linking,
} from 'react-native';
import {Header} from '../Header';
const URL =
  'https://newsapi.org/v2/everything?q=bitcoin&from=2020-03-25&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98';

class NewsFeedsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      isLoading: false,
      error: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.handleOnFucus);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.handleOnFucus);
  }
  handleOnFucus = async () => {
    this.setState({isLoading: true});
    this.fetchList();
  };

  fetchList = () => {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson);
        if (responseJson.Response == 'False') {
          this.setState({
            error: 'No news Data Found.',
          });
        }
        this.setState({
          isLoading: false,
          newsData: responseJson.articles,
        });
      })
      .catch((error) => {
        console.warn(error);
        //Deal with error if any  --- to handle --just  put it up for now  -
      });
  };
  render() {
    return (
      <React.Fragment>
        <Header
          onMenuPress={() => this.props.navigation.openDrawer()}
          title={'News Feeds'}
        />
        {this.state.isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={100} />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
              data={this.state.newsData}
              renderItem={({item}) => (
                <View
                  style={{padding: 10, margin: 10, backgroundColor: '#f5f5dc'}}>
                  <View style={{flex: 2, flexDirection: 'column'}}>
                    <View style={{width: '100%', padding: 10}}>
                      <Image
                        source={{uri: item.urlToImage}}
                        style={{
                          width: '100%',
                          height: 200,
                          borderWidth: 2,
                          borderColor: 'black',
                          borderRadius: 5,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                      <Text style={styles.head}>{item.title}</Text>
                      <Text style={styles.textKey}>Description:</Text>
                      <Text style={styles.text}>{item.description}</Text>
                      <Text style={styles.text}>Author: {item.author}</Text>
                      <Text style={styles.text}>
                        Published Date: {item.publishedAt}
                      </Text>
                      <Button
                        type="clear"
                        style={{margin: 2}}
                        title="Go to Details"
                        onPress={() => Linking.openURL(item.url)}
                      />
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={({id}, index) => id}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    color: 'black',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
  },
  textKey: {
    fontSize: 15,
    margin: 2,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 15,
    margin: 2,
    textTransform: 'capitalize',
  },
});

export default NewsFeedsScreen;
