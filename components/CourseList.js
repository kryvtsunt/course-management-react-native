import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import CourseService from "../services/CourseService";


class CourseList extends Component {
    static navigationOptions = {title: 'Courses'}

    constructor(props) {
        super(props)
        this.courseService = CourseService.instance;
        this.state = {
            courses: []
        }
        this.renderCourses = this.renderCourses.bind(this);
        this.findAllCourses = this.findAllCourses.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    componentWillReceiveProps() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then(courses => {
                this.setState({courses: courses})
            })
    }


    renderCourses() {
        return this.state.courses.map((course, index) => (
            <ListItem
                onPress={() => this.props.navigation.navigate("ModuleList",
                    {courseId: course.id})}
                title={course.title}
                key={index}
                leftIcon={{name: "folder-open", color: "black"}}/>
        ))
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderCourses()}
            </View>
        )
    }
}

export default CourseList