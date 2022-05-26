import { StyleSheet, Pressable, View, Text } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SelectItem = props => {
  const isChecked = false;

  return (
    <Pressable style={styles.container}>
      <Text style={styles.selectText}>SelectItem</Text>
      <View>
        {
          !isChecked ? <MaterialIcons name="check-box-outline-blank" size={24} color="black" /> :
            <MaterialIcons name="check-box" size={24} color="black" />
        }
      </View>
    </Pressable>
  )
}

export default SelectItem;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectText: {
      fontSize: 24
    }
});