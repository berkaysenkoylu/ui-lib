import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Modal,
  PanResponder,
  Animated,
  Dimensions,
  FlatList
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons  } from '@expo/vector-icons';

import SelectItem from './lib/SelectItem/index';

const MODAL_HEIGHT = Math.floor(Dimensions.get('screen').height / 2);

const Select = props => {
  const [showModal, setShowModal] = useState(false);

  const timeout = useRef(null);
  const position = useRef(new Animated.ValueXY()).current;
  const panResponderInstance = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < 0) {
        return;
      }
      position.setValue({
        x: 0,
        y: gestureState.dy
      });
      
      return Animated.event(
        [
          null,
          { dy: position.y }
        ],
        { useNativeDriver: false }
      )
    },
    onPanResponderRelease: (evt, gestureState) => {
      // position.flattenOffset();
      const { dy, moveY } = gestureState;

      if (moveY === 0 && dy === 0) {
        return;
      }

      let touchedAtTheBottom = (moveY / Dimensions.get('screen').height) * 100 > 85;
      let touchBottomThreshold = 15;
      let normalizedCordY = ((moveY - MODAL_HEIGHT) / (Dimensions.get('screen').height - MODAL_HEIGHT));
      
      if (normalizedCordY <= 0.5) {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      } else {
        if (Math.abs(dy) < Math.floor(MODAL_HEIGHT / 3) + touchBottomThreshold && touchedAtTheBottom) {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start();
        } else {
          setShowModal(prevState => !prevState);
        }
      }

      timeout.current = setTimeout(() => {
        position.setValue({
          x: 0,
          y: 0
        });
      }, 250);
    }
  })).current;
  
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    }
  }, []);

  const renderItem = ({ item }) => {
    return <SelectItem
      label={item.label}
      checked={item.isChecked}
    />
  };

  return (
    <>
      <Pressable
          style={({pressed}) => [styles.button, props.buttonStyling, pressed && styles.pressed]}
          onPress={() => setShowModal(prevState => !prevState)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.buttonText, props.textStyling]}>Select</Text>
          <View>
              <Ionicons name="chevron-down" size={25} color="black" />
          </View>
        </View>
      </Pressable>
      <View>
        <Modal
          animationType='slide'
          visible={showModal}
          transparent={true}>
            <Pressable style={styles.backdrop} onPress={() => setShowModal(prevState => !prevState)} />
            <Animated.View
              style={[styles.modalView, { transform: [{ translateY: position.y }] }]}
              {...panResponderInstance.panHandlers}
            >
              <View style={styles.modalBody}>
                <Text style={styles.modalHeader}>Select Heading</Text>

                <View style={styles.modalDivider}/>

                <View>
                  <FlatList
                    data={props.options}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </Animated.View>
            
        </Modal>
      </View>
    </>
  )
}

export default Select;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orangered',
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    },
    pressed: {
        opacity: 0.4
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%'
    },
    modalView: {
      position: 'absolute',
      bottom: 0,
      height: MODAL_HEIGHT,
      backgroundColor:'orangered',
      borderRadius: 20,
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      alignItems: 'center',
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 5
    },
    modalBody: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      padding: 10
    },
    modalHeader: {
      alignSelf: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 8
    },
    modalDivider: {
      borderColor: 'black',
      borderBottomWidth: 2,
      width: '10%',
      alignSelf: 'center',
      marginVertical: 5
    }
});