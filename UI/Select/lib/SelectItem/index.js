import { Pressable, View, Text } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './assets/styles';

const SelectItem = props => {
  const { label, checked, pressed } = props;

  return (
    <Pressable style={styles.container} onPress={pressed}>
      <Text style={styles.selectText}>{label}</Text>
      <View>
        {
          !checked ? <MaterialIcons name="check-box-outline-blank" size={24} color="black" /> :
            <MaterialIcons name="check-box" size={24} color="black" />
        }
      </View>
    </Pressable>
  )
}

export default SelectItem;