import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';

import Element from './UI/Element';
import Select from './UI/Select';

const customFonts = {
  'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectOptions, setSelectOptions] = useState([
    {
      id: 'opt1',
      label: 'Dog',
      value: 'dog',
      isChecked: false
    },
    {
      id: 'opt2',
      label: 'Cat',
      value: 'cat',
      isChecked: false
    },
    {
      id: 'opt3',
      label: 'Budgie',
      value: 'budgie',
      isChecked: false
    }
  ]);

  const _loadFontAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    _loadFontAsync();
  }, [_loadFontAsync]);

  const onSelectItemPressedHandler = (index) => {
    setSelectOptions(prevState => {
      return prevState.map((selectItem, i) => {
        if (index !== i) {
          selectItem.isChecked = false;
        } else {
          selectItem.isChecked = !selectItem.isChecked;
        }

        return selectItem;
      });
    })
  }

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View>
      <Element />
      <Select
        options={selectOptions}
        modalOptions={{
          modalHeader: 'Select Your Favorite Animal'
        }}
        onSelectItemPressed={onSelectItemPressedHandler}
      />
    </View>
  );
}

export default App;