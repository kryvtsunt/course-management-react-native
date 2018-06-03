import React from 'react';
import { StyleSheet,View, StatusBar, ScrollView} from 'react-native';
import {Text, Divider, ListItem, Button} from 'react-native-elements'
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeChooser from './elements/QuestionTypeChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import EssayQuestion from './elements/EssayQuestion'
import { createStackNavigator } from 'react-navigation'


class Home extends  React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <StatusBar hidden= {true} barStyle="light-content"/>
                <FixedHeader/>
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA') } />
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB') } />
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
class ScreenA extends  React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <Text h3>Screen A</Text>
            </ScrollView>
        );
    }
}

class ScreenB extends  React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <Text h3>Screen B</Text>
            </ScrollView>
        );
    }
}

const App = createStackNavigator({
    Home: { screen: Home },
    ScreenA: { screen: ScreenA },
    ScreenB: { screen: ScreenB }
});


export default App
