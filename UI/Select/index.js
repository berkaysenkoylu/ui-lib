import {
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
import { styles } from './assets/styles';
import { Ionicons  } from '@expo/vector-icons';

import SelectItem from './lib/SelectItem/index';

const MODAL_HEIGHT = Math.floor(Dimensions.get('screen').height / 2);

const Select = props => {
  const { options, modalOptions, onSelectItemPressed } = props;
  const [showModal, setShowModal] = useState(false);

  const timeout1 = useRef(null);
  const timeout2 = useRef(null);
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
      position.flattenOffset();
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

      timeout1.current = setTimeout(() => {
        position.setValue({
          x: 0,
          y: 0
        });
      }, 250);
    }
  })).current;
  
  useEffect(() => {
    return () => {
      // TODO: Find a more elegant way of doing this
      clearTimeout(timeout1.current);
      clearTimeout(timeout2.current);
    }
  }, []);

  const renderItem = ({ item, index }) => {
    return <SelectItem
      label={item.label}
      checked={item.isChecked}
      pressed={() => {
        onSelectItemPressed(index);
        timeout2.current = setTimeout(() => {
          setShowModal(false);
        }, 250);
      }}
    />
  };

  const { modalHeader } = modalOptions;

  return (
    <>
      <Pressable
          style={({pressed}) => [styles.button, props.buttonStyling, pressed && styles.pressed]}
          onPress={() => setShowModal(prevState => !prevState)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.buttonText, props.textStyling]}>{(options.find(opt => opt.isChecked) || {}).label || 'Select'}</Text>
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
              style={[styles.modalView, { height: MODAL_HEIGHT }, { transform: [{ translateY: position.y }] }]}
              {...panResponderInstance.panHandlers}
            >
              <View style={styles.modalBody}>
                <Text style={styles.modalHeader}>{modalHeader}</Text>

                <View style={styles.modalDivider}/>

                <View>
                  <FlatList
                    data={options}
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