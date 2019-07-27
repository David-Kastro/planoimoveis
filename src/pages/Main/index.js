import React, {Component} from 'react';

import { View, Text, StyleSheet, StatusBar, Platform, Dimensions, ScrollView, Image } from 'react-native';
import { Card, Title, Paragraph, Caption, Button, Searchbar, IconButton, Chip, Avatar, TouchableRipple } from 'react-native-paper'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiZGF2aWRrYXMiLCJhIjoiY2p5ZzNrOXBhMWlxcDNscW91bnYzaGhqMiJ9.Jafi9wsh04DbaaIYjFSrVQ');

class Main extends Component {

  state = {
    currentPosition: null,
    currentCard: 0,
    search: "",
  }

  static navigationOptions = {
    drawerLabel: 'Mapa',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/map.png')}
        style={[{width: 24, height: 24}, {tintColor: tintColor}]}
      />
    ),
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          currentPosition: [longitude, latitude],
        })
        console.log( this.state.currentPosition );
      },
      (err) => {console.log( err )},
      {
        timeout: 2000,
      }
    )
  }
  
  ellipsisText( text, maxLenght ) {
    const result = ( ( text ).length > maxLenght ) 
      ? ( ( ( text ).substring( 0, maxLenght - 3 ) ) + '...' ) 
      : text;

    return result;
  }

  async goToCurrentLocation() {

    if( this.state.currentPosition ) {

      this.map.flyTo(this.state.currentPosition)

    } else {
      navigator.geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
  
          const location = [longitude, latitude]
          this.map.flyTo(location)
  
        },
        (err) => {console.log( err )},
        {
          timeout: 2000,
        }
      )
    }
    
  }
  
  renderStatusBar() {
    return(
      Platform.select({
        ios: <StatusBar barStyle = "dark-content"/>,
  
        android: 
          <StatusBar 
            barStyle        = {Platform.Version < 23 ? "light-content" : "dark-content"}
            backgroundColor = {Platform.Version < 23 ? "rgba(0,0,0,0.3)" : "transparent"}
            translucent     = {true}/>
      })
    )
  }

  renderAnnotations() {
    return (
      <MapboxGL.PointAnnotation
        id='rocketseat'
        coordinate={[ -48.0357447, -15.8398551 ]}
      >
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <MapboxGL.Callout title='Exemplo' />
      </MapboxGL.PointAnnotation>
    )
  }

  async updateCard( offsetX ) {
    
    await this.setState({
      currentCard: Math.round(offsetX / 260)
    })

    console.log( this.state.currentCard );
  }

  render() {
    const { auth } = this.props;

    return (
      <>
        {this.renderStatusBar()}
        
        <MapboxGL.MapView
          ref={(map) => this.map = map}
          centerCoordinate={[ -48.0357447, -15.8398551 ]}
          style={styles.container}
          showUserLocation
        >
        </MapboxGL.MapView>

        <View style={{flex: 1, alignItems: 'center', flexDirection:'row', justifyContent: "space-around", position: 'absolute', top: 40, width: Dimensions.get('window').width}}>
          <Searchbar
            placeholder="Buscar Local..."
            onChangeText={ input => { this.setState({ search: input }) } }
            value={this.state.search}
            style={{width: Dimensions.get('window').width * 0.75}}
            theme={{colors:{
              primary: '#E30613',
            }}}
          />
          <View>
            <IconButton
              icon="apps"
              color="#E30613"
              size={40}
              style={{marginHorizontal: 10, width: 40}}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </View>
        </View>
        
        {/* bottom == scrollview height + 10 */}
        <View style={{flexDirection: "column", position: 'absolute', bottom: 240,  right: 10}}>
          <TouchableRipple
            style={{flex: 1, marginVertical: 5}}
            onPress={() => this.goToCurrentLocation()}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Avatar.Icon 
              size={50} 
              icon="gps-fixed" 
              color='#E30613'
              theme={{
                colors:{
                  primary: 'white',
                }
              }} /> 
          </TouchableRipple>

          <TouchableRipple
            style={{flex: 1, marginVertical: 5}}
            onPress={() => this.goToCurrentLocation()}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Avatar.Icon 
            size={50} 
            icon="tune" 
            color='white'
            theme={{
              colors:{
                primary: '#E30613',
              }
            }} /> 
          </TouchableRipple>
        </View>

        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView }}
          horizontal={true}
          alwaysBounceHorizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.9}
          snapToInterval={250} //your element width + margin
          snapToAlignment={"center"}
          contentContainerStyle={{paddingHorizontal: Dimensions.get('window').width * 0.5 - 125}}
          onMomentumScrollEnd={ (event) => this.updateCard(event.nativeEvent.contentOffset.x) }
          style={{position:'absolute', bottom: 0}}
        >
          <Card style={{width: 240, height: 230, marginHorizontal:5}}>
            <Card.Cover style={{height: 150}} source={require('../../assets/img1.jpg')} />
            <View style={{width: 240, position: 'absolute', top: 15, left: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Card><Text style={{paddingHorizontal: 8, marginVertical: 3, fontWeight: '500'}}>Anúncio Novo</Text></Card>
            </View>
            <View style={{width: 240, position: 'absolute', top: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                icon="favorite"
                color="rgba(255, 255, 255, 0.8)"
                size={40}
                style={{marginHorizontal: 10, width: 40}}
                onPress={() => console.log('Pressed')}
              />
            </View>
            <Card.Content>
              <View style={{flex: 1, alignItems: "center"}}>
                <Card style={{alignItems: 'center', marginTop: -10, height: 20}}>
                  <Text style={{paddingHorizontal: 10, color: "#22b536", fontWeight: '500'}}>Aluguel: R$ 4.800</Text>
                </Card>
              </View>
              <Paragraph style={{fontWeight: 'bold', marginTop: 15, color: '#707070'}}>
                {this.ellipsisText('SQN 115 Bloco J', 30)}
              </Paragraph>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10}}>
                <Chip icon="straighten" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  65m²
                </Chip>
                <Chip icon="hotel" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  2 Dorms.
                </Chip>
              </View>
            </Card.Content>
          </Card>  


          <Card style={{width: 240, height: 230, marginHorizontal:5}}>
            <Card.Cover style={{height: 150}} source={require('../../assets/img2.jpg')} />
            <View style={{width: 240, position: 'absolute', top: 15, left: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Card><Text style={{paddingHorizontal: 8, marginVertical: 3, fontWeight: '500'}}>Anúncio Novo</Text></Card>
            </View>
            <View style={{width: 240, position: 'absolute', top: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                icon="favorite"
                color="rgba(255, 255, 255, 0.8)"
                size={40}
                style={{marginHorizontal: 10, width: 40}}
                onPress={() => console.log('Pressed')}
              />
            </View>
            <Card.Content>
              <View style={{flex: 1, alignItems: "center"}}>
                <Card style={{alignItems: 'center', marginTop: -10, height: 20}}>
                  <Text style={{paddingHorizontal: 10, color: "#22b536", fontWeight: '500'}}>Aluguel: R$ 5.920</Text>
                </Card>
              </View>
              <Paragraph style={{fontWeight: 'bold', marginTop: 15, color: '#707070'}}>
                {this.ellipsisText('Quadra 101 Lote 08 Bloco A/B', 30)}
              </Paragraph>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10}}>
                <Chip icon="straighten" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  84m²
                </Chip>
                <Chip icon="hotel" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  3 Dorms.
                </Chip>
              </View>
            </Card.Content>
          </Card>


          <Card style={{width: 240, height: 230, marginHorizontal:5}}>
            <Card.Cover style={{height: 150}} source={require('../../assets/img3.jpg')} />
            <View style={{width: 240, position: 'absolute', top: 15, left: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Card><Text style={{paddingHorizontal: 8, marginVertical: 3, fontWeight: '500'}}>Anúncio Novo</Text></Card>
            </View>
            <View style={{width: 240, position: 'absolute', top: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                icon="favorite"
                color="rgba(255, 255, 255, 0.8)"
                size={40}
                style={{marginHorizontal: 10, width: 40}}
                onPress={() => console.log('Pressed')}
              />
            </View>
            <Card.Content>
              <View style={{flex: 1, alignItems: "center"}}>
                <Card style={{alignItems: 'center', marginTop: -10, height: 20}}>
                  <Text style={{paddingHorizontal: 10, color: "#22b536", fontWeight: '500'}}>Aluguel: R$ 1.780</Text>
                </Card>
              </View>
              <Paragraph style={{fontWeight: 'bold', marginTop: 15, color: '#707070'}}>
                {this.ellipsisText('SQN 309 Bloco K', 30)}
              </Paragraph>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10}}>
                <Chip icon="straighten" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  51m²
                </Chip>
                <Chip icon="hotel" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  1 Dorms.
                </Chip>
              </View>
            </Card.Content>
          </Card> 

          <Card style={{width: 240, height: 230, marginHorizontal:5}}>
            <Card.Cover style={{height: 150}} source={require('../../assets/img4.jpg')} />
            <View style={{width: 240, position: 'absolute', top: 15, left: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Card><Text style={{paddingHorizontal: 8, marginVertical: 3, fontWeight: '500'}}>Anúncio Novo</Text></Card>
            </View>
            <View style={{width: 240, position: 'absolute', top: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                icon="favorite"
                color="rgba(255, 255, 255, 0.8)"
                size={40}
                style={{marginHorizontal: 10, width: 40}}
                onPress={() => console.log('Pressed')}
              />
            </View>
            <Card.Content>
              <View style={{flex: 1, alignItems: "center"}}>
                <Card style={{alignItems: 'center', marginTop: -10, height: 20}}>
                  <Text style={{paddingHorizontal: 10, color: "#22b536", fontWeight: '500'}}>Aluguel: R$ 8.600</Text>
                </Card>
              </View>
              <Paragraph style={{fontWeight: 'bold', marginTop: 15, color: '#707070'}}>
                {this.ellipsisText('SCN Quadra 1 Lote 50 Bloco E', 30)}
              </Paragraph>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10}}>
                <Chip icon="straighten" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  116m²
                </Chip>
                <Chip icon="hotel" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                  4 Dorms.
                </Chip>
              </View>
            </Card.Content>
          </Card>


        </ScrollView>
      </>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7159C1',
    transform: [{ scale: 0.8 }],
  }
});

const mapStateToProps = state => ({
  auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
