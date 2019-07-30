import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";
import { Creators as PropertiesActions } from "../../store/ducks/Properties";

import firebase from 'react-native-firebase';

class Loading extends Component {

    componentDidMount() {

        firebase.auth().onAuthStateChanged( async user => {

            if( user ) {
                
                await this.props.SigninSuccess(user._user)
                this.props.navigation.navigate('Main');

            } else {

                await this.props.SignoutSuccess();
                await this.props.UnsetProperties();
                this.props.navigation.navigate('SignIn');

            }

        })

    }

    render() {
        return null
    }
};

const mapStateToProps = state => ({
    auth: state.authReducers,
    properties: state.propertiesReducers
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({...AuthActions, ...PropertiesActions}, dispatch);
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);