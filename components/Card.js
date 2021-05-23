import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (<View style= {{...styles.cardStyle, ...props.style }}>
        {props.children}
    </View>
    )
};

const styles = StyleSheet.create ({
    cardStyle: {
        
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius:5,
        shadowColor: 'white'
    }
});

export default Card;