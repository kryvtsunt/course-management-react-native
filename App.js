import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'

import TopicList from './components/TopicList'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import FillBlanksQuestionEditor from './elements/FillBlanksQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
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
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button
                    buttonStyle={{
                        backgroundColor: "#2C3539",
                        width: 250,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        padding: 5,
                        margin: 20,
                    }}
                    title="Courses"
                    onPress={() => this.props.navigation
                        .navigate('CourseList')}/>
            </View>
        )
    }
}

const App = createStackNavigator({
        Home,
        CourseList,
        ModuleList,
        LessonList,
        TopicList,
        WidgetList,
        ExamEditor,
        AssignmentEditor,
        TrueFalseQuestionEditor,
        MultipleChoiceQuestionEditor,
        EssayQuestionEditor,
        FillBlanksQuestionEditor,
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5f6e87',
            },
            headerTintColor: 'white'


        }
    }
)

export default App;
