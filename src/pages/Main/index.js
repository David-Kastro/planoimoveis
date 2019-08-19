import React, {Component} from 'react';

import { View, Text, StyleSheet, StatusBar, Platform, Dimensions, ScrollView, Image } from 'react-native';
import { Card, Title, Paragraph, Caption, Button, Searchbar, IconButton, Chip, Avatar, TouchableRipple } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import debounce from 'lodash/debounce';

import { Transition } from 'react-navigation-fluid-transitions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";
import { Creators as PropertiesActions } from "../../store/ducks/Properties";

import Properties from './properties';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiZGF2aWRrYXMiLCJhIjoiY2p5ZzNrOXBhMWlxcDNscW91bnYzaGhqMiJ9.Jafi9wsh04DbaaIYjFSrVQ');

const imoveis = [
  {
    id: 1,
    title: 'SQN 115 Bloco J',
    image: require('../../assets/img1.jpg'),
    price: 'R$ 4.800',
    size: '65m²',
    dorms: '2 Dorms.',
    longitude: -48.033634050658634,
    latitude: -15.837634192063879,
    favorited: false,
  },
  {
    id: 2,
    title: 'Quadra 101 Lote 08 Bloco A/B',
    image: require('../../assets/img2.jpg'),
    price: 'R$ 5.920',
    size: '84m²',
    dorms: '3 Dorms.',
    longitude: -48.038123315092264,
    latitude: -15.838789075651658,
    favorited: false,
  },
  {
    id: 3,
    title: 'SQN 309 Bloco K',
    image: require('../../assets/img3.jpg'),
    price: 'R$ 1.780',
    size: '51m²',
    dorms: '1 Dorms.',
    longitude: -48.0374454693366,
    latitude: -15.841130224199306,
    favorited: false,
  },
  {
    id: 4,
    title: 'SCN Quadra 1 Lote 50 Bloco E',
    image: require('../../assets/img4.jpg'),
    price: 'R$ 8.600',
    size: '116m²',
    dorms: '4 Dorms.',
    longitude: -48.036106759843506,
    latitude: -15.83844616645192,
    favorited: false,
  },
]

class Main extends Component {

  constructor(props) {
    super(props);
    
    this.goToCurrentLocation = debounce( this.goToCurrentLocation, 500 );
    this.selectProperty      = debounce( this.selectProperty, 800 );

    this.state = {
      currentPosition: null,
      currentCard: 0,
      search: "",
    }
  }

  static navigationOptions = {
    drawerLabel: 'Procurar Imóveis',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/map.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    ),
  };

  async componentDidMount() {

    await this.props.SetProperties(imoveis)
    setTimeout(() => this.selectProperty(0), 1000)

    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          currentPosition: [longitude, latitude],
        })
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

      await this.map.flyTo(this.state.currentPosition)
      this.map.zoomTo(15, 500)

    } else {
      navigator.geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
  
          const location = [longitude, latitude]

          await this.map.flyTo(location, 800)
          this.map.zoomTo(15, 500)
  
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

  selectPropertyByOffset( offsetX ) {
    const propertyIndex = Math.round(offsetX / 260);
    this.selectProperty(propertyIndex);
  }

  async selectProperty(index) {
    const { properties } = this.props
    const {id, longitude, latitude} = properties.properties[index];

    this.props.SelectProperty(id)
    await this.map.flyTo([longitude, latitude], 800);
    this.map.zoomTo(16, 500)
  }

  toggleFavorite(id) {
    const { properties } = this.props;
    const property = properties.properties.filter( property => property.id == id )[0]
    
    property.favorited  && this.props.UnfavoriteProperty( id );
    !property.favorited && this.props.FavoriteProperty( id );

  }

  render() {
    const { auth, properties } = this.props;

    return (
      <>
        {this.renderStatusBar()}
        
        <MapboxGL.MapView
          ref={(map) => this.map = map}
          centerCoordinate={[ -48.0357447, -15.8398551 ]}
          zoomLevel={15}
          style={styles.container}
          showUserLocation
        >
          <Properties />
        </MapboxGL.MapView>

        <View style={{flex: 1, alignItems: 'center', flexDirection:'row', justifyContent: "space-around", position: 'absolute', top: 40, width: Dimensions.get('window').width}}>
          <Searchbar
            elevation={0}
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
              icon="menu"
              color="#E30613"
              size={40}
              style={{marginHorizontal: 10, width: 40}}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </View>
        </View>
        
        {/* bottom == scrollview height + 10 */}
        <View style={{flexDirection: "column", position: 'absolute', bottom: 240,  right: 10}}>
          <Ripple
            style={{flex: 1, marginVertical: 5}}
            onPress={() => this.goToCurrentLocation()}
            rippleColor="#000"
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
          </Ripple>

          <Ripple
            style={{flex: 1, marginVertical: 5}}
            onPress={() => this.goToCurrentLocation()}
            rippleColor="#000"
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
          </Ripple>
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
          onMomentumScrollEnd={ (event) => this.selectPropertyByOffset(event.nativeEvent.contentOffset.x) }
          style={{position:'absolute', bottom: 0}}
        >
          { properties.properties.map( property => (
      
              <Card key={property.id} style={{width: 240, height: 230, marginHorizontal:5, overflow: 'hidden'}}>
                <Ripple 
                  rippleColor="#fff" 
                  rippleOpacity={1} 
                  rippleDuration={1000}
                  onPress={() => this.props.navigation.navigate('Property')}
                >
                  <Transition shared={`property_${property.id}`}>
                    <Card.Cover style={{height: 150, overflow: 'hidden'}} source={property.image} />
                  </Transition>

                  <View style={{width: 240, position: 'absolute', top: 15, left: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Card><Text style={{paddingHorizontal: 8, marginVertical: 3, fontWeight: '500'}}>Anúncio Novo</Text></Card>
                  </View>
                  <View style={{width: 240, position: 'absolute', top: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <IconButton
                      icon="favorite"
                      color={property.favorited ? 'red': "rgba(255, 255, 255, 0.8)"}
                      size={40}
                      style={{marginHorizontal: 10, width: 40}}
                      onPress={() => this.toggleFavorite(property.id)}
                    />
                  </View>
                  <Card.Content>
                    <View style={{flex: 1, alignItems: "center"}}>
                      <Card style={{alignItems: 'center', marginTop: -10, height: 20}}>
                        <Text style={{paddingHorizontal: 10, color: "#22b536", fontWeight: '500'}}>Aluguel: { property.price }</Text>
                      </Card>
                    </View>
                    <Paragraph style={{fontWeight: 'bold', marginTop: 15, color: '#707070'}}>
                      {this.ellipsisText( property.title, 30)}
                    </Paragraph>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10}}>
                      <Chip icon="straighten" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                        { property.size }
                      </Chip>
                      <Chip icon="hotel" selectedColor='#787878' style={{backgroundColor: 'transparent', flex: 1}}>
                        { property.dorms }
                      </Chip>
                    </View>
                  </Card.Content>
                </Ripple>
              </Card>

          )) }

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
  auth: state.authReducers,
  properties: state.propertiesReducers
});

const mapDispatchToProps = dispatch => bindActionCreators({...AuthActions, ...PropertiesActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);