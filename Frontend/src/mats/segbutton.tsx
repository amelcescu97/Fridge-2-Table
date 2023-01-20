import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const SegButton = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
      
        value={value}
        onValueChange={setValue}
        buttons={[ 
          { style: styles.buttons,
            value: 'train',
            label: 'Cart',
          },
          {style: styles.buttons,
            value: 'drive', label: 'Add' },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttons:
  {
    padding:5,
  }
});

export default SegButton;