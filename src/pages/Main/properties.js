import React, {Component} from "react";

import { AnnotationContainer, AnnotationText } from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";
import { Creators as PropertiesActions } from "../../store/ducks/Properties";

import MapboxGL from '@mapbox/react-native-mapbox-gl';

class Properties extends Component{

  render() {
    const { properties } = this.props;
    console.log( properties.properties )

    return (
      <>
        {properties.properties.map( property => (
          <MapboxGL.PointAnnotation
            key={ property.id }
            id={ property.id.toString() }
            coordinate={[ parseFloat( property.longitude ), parseFloat( property.latitude ) ]}
          >
            <AnnotationContainer backgroundColor={property.id === properties.selectedProperty ? '#E30613' : '#FC6663'}>
              <AnnotationText>{ property.price }</AnnotationText>
            </AnnotationContainer>
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