import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import TopicService from "../services/TopicService";

class TopicList extends Component {
    static navigationOptions = {title: 'Topic'}

    constructor(props) {
        super(props)
        this.topicService = TopicService.instance
        this.state = {
            topics: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
        this.findAllTopicsForLesson = this.findAllTopicsForLesson.bind(this);
        this.renderTopics = this.renderTopics.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        this.setState({courseId: courseId})
        const moduleId = navigation.getParam("moduleId")
        this.setState({moduleId: moduleId})
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        this.findAllTopicsForLesson(courseId, moduleId, lessonId)
    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        this.setState({courseId: courseId})
        const moduleId = navigation.getParam("moduleId")
        this.setState({moduleId: moduleId})
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        this.findAllTopicsForLesson(courseId, moduleId, lessonId)
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId){
        this.topicService.findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then(topics => this.setState({topics}))
    }

    renderTopics(){
        return this.state.topics.map(
            (topic, index) => (
                <ListItem
                    onPress={() => this.props.navigation
                        .navigate("WidgetList", {topicId: topic.id})}
                    key={index}
                    title={topic.title}
                    leftIcon={{name: "label", color:"black"}}
                />))
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderTopics()}
            </View>
        )
    }
}

export default TopicList