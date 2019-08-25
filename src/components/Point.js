import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';


export default class Point extends Component {
    state = {
        areaScale  : new Animated.Value(1),
        areaOpacity : new Animated.Value(0.6),
        animated: false,
    }

    componentDidUpdate() {
        
        const { activate } = this.props;

        if( activate ) {
            if( !this.state.animated ) {
                this.runAnimation();
                this.setState({
                    animated: true,
                });
            }
            
        } else {
            if( this.state.animated ) {
                this.stopAnimation();
            }
        }
    }

    stopAnimation() {
        Animated.timing(this.state.areaScale).stop();
        Animated.timing(this.state.areaOpacity).stop();

        this.setState({
            areaScale  : new Animated.Value(1),
            areaOpacity : new Animated.Value(0.6),
            animated: false,
        })
    }

    runAnimation() {
        Animated.loop(
            Animated.timing( this.state.areaScale, {
                toValue: 4,
                duration: 2000,
                useNativeDriver: true
            }),
        ).start();

        Animated.loop(
            Animated.timing( this.state.areaOpacity, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true
            }),
        ).start();
    }

    render() {

        const { backgroundColor, color, text } = this.props;

        return(
        
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, paddingHorizontal: 8, height: 30, borderRadius: 15}}>
                    <Text style={{fontSize: 14, color: color}}>{text}</Text>
                </View>
                <View 
                    style={{
                        width: 0, 
                        height: 0, 
                        backgroundColor: 'transparent', 
                        borderStyle: 'solid', 
                        borderLeftWidth: 5, 
                        borderRightWidth: 5, 
                        borderTopWidth: 10, 
                        borderLeftColor: 'transparent', 
                        borderRightColor: 'transparent', 
                        borderTopColor: backgroundColor
                    }}
                >
                </View>  
                <View style={{ backgroundColor: backgroundColor, width: 10, height: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                    <Animated.View style={{width: 10, height: 10, backgroundColor: backgroundColor, borderRadius: 5, transform:[{scale: this.state.areaScale}], opacity: this.state.areaOpacity}} />
                </View>
            </View>
        )
    }
};