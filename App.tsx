/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Row from './app/components/Row';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PossiblePlays from './app/components/PossiblePlays';
import WinnerCombination from './app/components/WinnerCombination';

export const POSSABILITIES = [
  'red',
  'green',
  'purple',
  'yellow',
  'brown',
  'orange',
  'black',
  'grey',
];

const winnerSequence = POSSABILITIES.sort(() => Math.random() - 0.5);

function App(): React.JSX.Element {
  const [playColor, setPlayColor] = useState<string>();
  const [currentStep, setCurrentStep] = useState<any>([
    [undefined, undefined, undefined, undefined],
  ]);
  const [stepResult, setStepResult] = useState<any>([]);
  const [winner, setWinner] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const checkResult = () => {
    const currentStepRow = currentStep.length - 1;
    const finalWinnerSequence = winnerSequence
      .map((color, index) => {
        if (index >= 4) {
          return;
        } else {
          return color;
        }
      })
      .filter(s => s !== undefined);
    console.log('currentStep[currentStepRow]', currentStep[currentStepRow]);

    const matchedIndicesBlack: number[] = []; // To keep track of matched indices for black pegs
    const matchedIndicesWhite: number[] = []; // To keep track of matched indices for white pegs

    // Check for black pegs
    currentStep[currentStepRow].forEach((element: string, index: number) => {
      console.log(
        'ENTER finalWinnerSequence[index]',
        finalWinnerSequence[index],
      );
      console.log('ENTER element', element);

      if (
        finalWinnerSequence[index] === element &&
        !matchedIndicesBlack.includes(index)
      ) {
        matchedIndicesBlack.push(index); // Mark this index as matched for black peg
        finalWinnerSequence[index] = undefined;
      }
    });

    // Check for white pegs
    currentStep[currentStepRow].forEach((element: string, index: number) => {
      if (!matchedIndicesBlack.includes(index)) {
        const colorIndex = finalWinnerSequence.indexOf(element);
        if (
          colorIndex !== -1 &&
          !matchedIndicesBlack.includes(colorIndex) &&
          !matchedIndicesWhite.includes(colorIndex)
        ) {
          matchedIndicesWhite.push(colorIndex); // Mark this index as matched for white peg
        }
      }
    });

    let newStepResult = [...stepResult];
    const rowResultBlack = matchedIndicesBlack.map(_ => 'black');
    const rowResultWhite = matchedIndicesWhite.map(_ => 'white');
    newStepResult[currentStepRow] = [...rowResultBlack, ...rowResultWhite];
    console.log('ENTER final winner sequence', finalWinnerSequence);

    console.log('ENTER WHAT ARE WE DOING', [
      ...rowResultBlack,
      ...rowResultWhite,
    ]);

    setStepResult(newStepResult);

    if (matchedIndicesBlack.length === 4) {
      setWinner(true);
    } else {
      setCurrentStep([
        ...currentStep,
        [undefined, undefined, undefined, undefined],
      ]);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderBoard = () => {
    // Fill with 0 it was the quickest way to do it, didn't remember anytying fancier
    return new Array(9).fill(0).map((_, i: number) => {
      return (
        <View style={{flexDirection: 'row'}} key={i}>
          <Row
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            playColor={playColor}
            rowIndex={i}
            stepResult={stepResult}
          />
          {currentStep.length - 1 === i && (
            <TouchableOpacity
              key={i}
              onPress={() => {
                if (currentStep[i].includes(undefined)) {
                  return;
                }
                checkResult();
              }}
              style={{marginHorizontal: 10, marginTop: 5}}>
              <Text>Check</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        {winnerSequence && (
          <WinnerCombination winnerSequence={winnerSequence} />
        )}
      </View>
      <View>{renderBoard().reverse()}</View>
      <View>
        <PossiblePlays setPlayColor={setPlayColor} />
      </View>
    </SafeAreaView>
  );
}

export default App;
