import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const renderRow = ({
  rowIndex,
  currentStep,
  setCurrentStep,
  playColor,
  stepResult,
}: {
  rowIndex: number;
  currentStep: any;
  setCurrentStep: (step: any) => void;
  playColor: string | undefined;
  stepResult: any;
}) => {
  const playSpotOnPress = (index: number) => {
    const currentStepRow = currentStep.length - 1;
    const newCurrentStep = [...currentStep];
    if (index === 0) {
      newCurrentStep[currentStepRow] = [
        playColor,
        newCurrentStep[currentStepRow][1],
        newCurrentStep[currentStepRow][2],
        newCurrentStep[currentStepRow][3],
      ];
    } else if (index === 1) {
      newCurrentStep[currentStepRow] = [
        newCurrentStep[currentStepRow][0],
        playColor,
        newCurrentStep[currentStepRow][2],
        newCurrentStep[currentStepRow][3],
      ];
    } else if (index === 2) {
      newCurrentStep[currentStepRow] = [
        newCurrentStep[currentStepRow][0],
        newCurrentStep[currentStepRow][1],
        playColor,
        newCurrentStep[currentStepRow][3],
      ];
    } else {
      newCurrentStep[currentStepRow] = [
        newCurrentStep[currentStepRow][0],
        newCurrentStep[currentStepRow][1],
        newCurrentStep[currentStepRow][2],
        playColor,
      ];
    }
    setCurrentStep(newCurrentStep);
  };

  const renderRow = () =>
    [0, 1, 2, 3].map(spotIndex => (
      <TouchableOpacity
        key={rowIndex + spotIndex}
        onPress={() => {
          playSpotOnPress(spotIndex);
        }}
        disabled={currentStep.length - 1 !== rowIndex}>
        <View
          style={[
            styles.boardElement,
            {
              backgroundColor: currentStep[rowIndex]?.[spotIndex] ?? 'grey',
            },
          ]}
        />
      </TouchableOpacity>
    ));

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {renderRow()}
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: 5,
            height: 5,
            margin: 1,

            backgroundColor:
              currentStep.length - 1 === rowIndex
                ? 'grey'
                : stepResult[rowIndex]?.[0] ?? 'grey',
          }}
        />
        <View
          style={{
            width: 5,
            height: 5,
            margin: 1,
            backgroundColor:
              currentStep.length - 1 === rowIndex
                ? 'grey'
                : stepResult[rowIndex]?.[1] ?? 'grey',
          }}
        />
      </View>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            width: 5,
            height: 5,
            margin: 1,
            backgroundColor:
              currentStep.length - 1 === rowIndex
                ? 'grey'
                : stepResult[rowIndex]?.[2] ?? 'grey',
          }}
        />
        <View
          style={{
            width: 5,
            height: 5,
            margin: 1,
            backgroundColor:
              currentStep.length - 1 === rowIndex
                ? 'grey'
                : stepResult[rowIndex]?.[3] ?? 'grey',
          }}
        />
      </View>
    </View>
  );
};

export default renderRow;

const styles = StyleSheet.create({
  boardElement: {width: 10, height: 10, margin: 10},
});
