import React, {Component} from "react";

import { AnnotationContainer, AnnotationText } from './styles';
import Point from '../../components/Point';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";
import { Creators as PropertiesActions } from "../../store/ducks/Properties";

import MapboxGL from '@mapbox/react-native-mapbox-gl';

class Properties extends Component{

  render() {
    const { properties } = this.props;

    return (
      <>
        {properties.properties.map( property => (
          <MapboxGL.PointAnnotation
            key={ property.id }
            id={ property.id.toString() }
            coordinate={[ parseFloat( property.longitude ), parseFloat( property.latitude ) ]}
          >
            <Point 
              backgroundColor={property.id === properties.selectedProperty ? '#E30613' : '#00cc7a'} 
              color="white"
              text={property.price}
              activate={property.id === properties.selectedProperty}        
            />
            <MapboxGL.Callout title={ property.title }/>
          </MapboxGL.PointAnnotation>
        ))}
      </>
    )
  }
} 

const mapStateToProps = state => ({
  auth: state.authReducers,
  properties: state.propertiesReducers
});

const mapDispatchToProps = dispatch => bindActionCreators({...AuthActions, ...PropertiesActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Properties);