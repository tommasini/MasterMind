import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {POSSABILITIES} from '../../../App';

const PossiblePlays = ({
  setPlayColor,
}: {
  setPlayColor: (color: string) => void;
}) => {
  const halfLength = Math.ceil(POSSABILITIES.length / 2);
  const firstHalf = POSSABILITIES.slice(0, halfLength);
  const secondHalf = POSSABILITIES.slice(halfLength);
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {firstHalf.map(color => (
          <TouchableOpacity key={color} onPress={() => setPlayColor(color)}>
            <View
              style={[
                styles.possiblePlay,
                {
                  backgroundColor: color,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flexDirection: 'row'}}>
        {secondHalf.map(color => (
          <TouchableOpacity key={color} onPress={() => setPlayColor(color)}>
            <View
              style={[
                styles.possiblePlay,
                {
                  backgroundColor: color,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PossiblePlays;
const styles = StyleSheet.create({
  possiblePlay: {width: 10, height: 10, margin: 10},
});
