import React, {Component} from 'react';
import { Animated } from 'react-native';

export default class FadeAnimation extends Component {

    state = {
        visible: this.props.visible,
    }
  
    componentWillMount() {
      this._visibility = new Animated.Value( this.props.visible ? 1 : 0 );
    }
  
    componentWillReceiveProps( newProps ) {

      newProps.visible && this.setState({ visible: true });

      Animated.timing( this._visibility, {
          
        toValue         : newProps.visible ? 1 : 0,
        duration        : 200,
        useNativeDriver : true,

      }).start(() => {

        this.setState({ visible: newProps.visible });

      });

    }
  
    render() {
      const { visible, style, children, ...rest } = this.props;
        
      const containerStyle = {

        opacity: this._visibility.interpolate({
          inputRange  : [0, 1],
          outputRange : [0, 1],
        }),
        transform: [
          {
            translateY: this._visibility.interpolate({
              inputRange  : [0, 1],
              outputRange : [10, 0],
            }),
          },
        ],
      };
  
      const combinedStyle = [ containerStyle, style ];

      return (
        <Animated.View 
            style = {this.state.visible ? combinedStyle : containerStyle} 
            {...rest}
        >
          {this.state.visible ? children : null}
        </Animated.View>
      );
    }
  }