import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import LessonService from '../services/LessonService'

class LessonList extends Component {
    static navigationOptions = {title: 'Lessons'}
    constructor(props) {
        super(props)
        this.lessonService  = LessonService.instance
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }

        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        this.setState({courseId: courseId})
        const moduleId = navigation.getParam("moduleId")
        this.setState({moduleId: moduleId})
        this.findAllLessonsForModule(courseId, moduleId);
    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        this.setState({courseId: courseId})
        const moduleId = navigation.getParam("moduleId")
        this.setState({moduleId: moduleId})
        this.findAllLessonsForModule(courseId, moduleId);
    }

    findAllLessonsForModule(courseId, moduleId){
        this.lessonService.findAllLessonsForModule(courseId, moduleId)
            .then(lessons => this.setState({lessons}))
    }

    renderLessons(){
        return this.state.lessons.map(
            (lesson, index) => (
                <ListItem
                    onPress={() => this.props.navigation
                        .navigate("TopicList", {lessonId: lesson.id, courseId:
                        this.state.courseId, moduleId: this.state.moduleId})}
                    key={index}
                    title={lesson.title}/>))
    }

    render() {
        return(
            <View style={{padding: 15}}>
                {this.renderLessons()}
            </View>
        )
    }
}
export default LessonList