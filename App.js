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
import ScreenX from './elements/ScreenX'

class Home extends  React.Component {
    static navigationOptions = { title: 'Home' };
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
                <Button
                    title="Go to Screen X"
                    onPress={() =>
                        this.props.navigation.navigate('ScreenX', {parameter: 'Welcome'})
                    }/>
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
     static navigationOptions = { title: 'ScreenA' };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <Text h3>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .navigate('Home')} />
            </ScrollView>
        );
    }
}

class ScreenB extends  React.Component {
    static navigationOptions = { title: 'ScreenB' };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <Text h3>Screen B</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </ScrollView>
        );
    }
}

const App = createStackNavigator({
    Home,
    ScreenA,
    ScreenB,
    ScreenX
}, { initialRouteName: 'Home' });


export default App
