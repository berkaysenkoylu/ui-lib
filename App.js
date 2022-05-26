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
      label: 'Option 1',
      value: 'option1',
      isChecked: false
    },
    {
      id: 'opt2',
      label: 'Option 2',
      value: 'option2',
      isChecked: false
    },
    {
      id: 'opt3',
      label: 'Option 3',
      value: 'option3',
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
      />
    </View>
  );
}

export default App;