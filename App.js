import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeChooser from './elements/QuestionTypeChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'

import TopicList from './components/TopicList'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import FillBlanksQuestionEditor from './elements/FillBlanksQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import ExamEditor from './components/ExamEditor'
import AssignmentEditor from './components/AssignmentEditor'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View>
                <StatusBar barStyle="light-content"/>
                <Button
                    backgroundColor="blue"
                        title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
            </View>
        )
    }
}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
)

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    ExamEditor,
    AssignmentEditor,
    TopicList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    EssayQuestionEditor,
    FillBlanksQuestionEditor,
    ScreenA,
    ScreenB,
    ScreenX
});

export default App;
