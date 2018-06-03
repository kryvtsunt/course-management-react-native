import React from 'react';
import { StyleSheet,View, StatusBar, ScrollView} from 'react-native';
import {Text, Divider, ListItem} from 'react-native-elements'
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeChooser from './elements/QuestionTypeChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import EssayQuestion from './elements/EssayQuestion'
export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <StatusBar hidden= {true} barStyle="light-content"/>
        <FixedHeader/>
        <QuestionTypeChooser/>
        <QuestionTypePicker/>
        <EssayQuestion/>
        <Exam/>
        <Icons/>
        <View style={{padding: 20}}>
        <TextHeadings/>
        </View>


      </ScrollView>
    );
  }
}

