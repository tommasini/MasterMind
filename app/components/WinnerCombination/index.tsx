import React from 'react';
import {StyleSheet, View} from 'react-native';

const WinnerCombination = ({winnerSequence}: {winnerSequence: any}) => {
  const renderWinnerRows = () => {
    const rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push(
        <View
          key={i}
          style={[styles.winnerElement, {backgroundColor: winnerSequence[i]}]}
        />,
      );
    }
    return rows;
  };

  return <View style={{flexDirection: 'row'}}>{renderWinnerRows()}</View>;
};

export default WinnerCombination;

const styles = StyleSheet.create({
  winnerElement: {width: 10, height: 10, margin: 10},
});
