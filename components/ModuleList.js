import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ModuleService from "../services/ModuleService"

class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}

    constructor(props) {
        super(props)
        this.moduleService = ModuleService.instance;
        this.state = {
            modules: [],
            courseId: 1
        }
        this.renderModules = this.renderModules.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({courseId: courseId })
        this.findAllModulesForCourse(courseId);
    }

    componentWillReceiveProps() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({courseId: courseId })
        this.findAllModulesForCourse(courseId);
    }

    findAllModulesForCourse(courseId){
        this.moduleService.findAllModulesForCourse(courseId).then(modules => this.setState({modules: modules}))
    }

    renderModules(){
        return this.state.modules.map((module, index) => (
            <ListItem
                onPress={() => this.props.navigation
                    .navigate("LessonList", {
                        courseId:
                        this.state.courseId, moduleId: module.id
                    })}
                key={index}
                title={module.title}/>
        ))
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderModules()}
            </View>
        )
    }

}

export default ModuleList