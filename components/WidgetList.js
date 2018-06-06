import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput} from 'react-native-elements'
import WidgetService from "../services/WidgetService";

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.widgetService = WidgetService.instance
        this.state = {
            widgets: [],
            exams: [],
            assignments: [],
            courseId: 1,
            moduleId: 1,
            topicId: 1,
            widgetType: 'Exam',
            newWidgetName: ''
        }
        this.findAllWidgetsForTopic = this.findAllWidgetsForTopic.bind(this);
        this.findAllExamsForTopic = this.findAllExamsForTopic.bind(this);
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);
        this.renderWidgets = this.renderWidgets.bind(this);
        this.renderExams = this.renderExams.bind(this);
        this.renderAssignments = this.renderAssignments.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.createExam = this.createExam.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
        this.navigateExam = this.navigateExam.bind(this);
        this.navigateAssignment = this.navigateAssignment.bind(this);
        this.navigator = this.navigator.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId: topicId})
        // this.findAllWidgetsForTopic(topicId);
        this.findAllExamsForTopic(topicId);
        this.findAllAssignmentsForTopic(topicId);
    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId: topicId})
        // this.findAllWidgetsForTopic(topicId);
        this.findAllExamsForTopic(topicId);
        this.findAllAssignmentsForTopic(topicId);
    }

    findAllWidgetsForTopic(topicId) {
        this.widgetService.findAllWidgetsForTopic(topicId)
            .then(widgets => this.setState({widgets}))
    }

    findAllExamsForTopic(topicId) {
        this.widgetService.findAllExamsForTopic(topicId)
            .then(exams => this.setState({exams}))
    }

    findAllAssignmentsForTopic(topicId) {
        this.widgetService.findAllAssignmentsForTopic(topicId)
            .then(assignments => this.setState({assignments}))
    }

    renderWidgets() {
        return this.state.widgets.map(
            (widget, index) => (
                <ListItem
                    onPress={this.navigator}
                    key={index}
                    title={widget.name}
                    leftIcon={{name: "close", color:"red"}}
                />))
    }

    renderExams() {
        return this.state.exams.map(
            (exam, index) => (
                <ListItem
                    onPress={() => this.props.navigation.navigate("ExamEditor", {examId: exam.id})}
                    key={index}
                    title={exam.name}
                    leftIcon={{name: "close", color:"red"}}
                    leftIconOnPress ={() => this.deleteExam(exam.id)}
                />))
    }

    renderAssignments() {
        return this.state.assignments.map(
            (assignment, index) => (
                <ListItem
                    onPress={() => this.props.navigation.navigate("AssignmentEditor", {assignmentId: assignment.id})}
                    key={index}
                    title={assignment.name}
                    leftIcon={{name: "close", color:"red"}}
                    leftIconOnPress ={() => this.deleteAssignment(assignment.id)}
                />))
    }

    navigator() {
        if (widget.widgetType === "Exam") {
            this.navigateExam();
        } else if (widget.widgetType === "Assignment") {
            this.navigateAssignment();
        }

    }

    navigateExam() {
        this.props.navigation.navigate("ExamEditor", {examId: widget.id})
    }

    navigateAssignment() {
        this.props.navigation.navigate("AssignmentEditor", {assignmentId: widget.id})
    }

    createWidget() {
        if (this.state.widgetType === "Exam") {
            this.createExam();
        } else if (this.state.widgetType === "Assignment") {
            this.createAssignment();
        }
    }

    createExam() {
        let addWidget = {name: 'New Exam'};
        if (this.state.newWidgetName !== '') {
            addWidget.name = this.state.newWidgetName;
        }
        this.widgetService.createExam(this.state.topicId, addWidget)
            .then(() => {
                this.findAllExamsForTopic(this.state.topicId);
            });
    }

    createAssignment() {
        let addWidget = {name: 'New Assignment'};
        if (this.state.newWidgetName !== '') {
            addWidget.name = this.state.newWidgetName;
        }
        this.widgetService.createAssignment(this.state.topicId, addWidget)
            .then(() => {
                this.findAllAssignmentsForTopic(this.state.topicId);
            });
    }

    deleteExam(examId){
        this.widgetService.deleteExam(examId)
            .then(() => {
                this.findAllExamsForTopic(this.state.topicId);
            });
    }

    deleteAssignment(assignmentId){
        this.widgetService.deleteAssignment(assignmentId)
            .then(() => {
                this.findAllAssignmentsForTopic(this.state.topicId);
            });
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {/*{this.renderWidgets()}*/}
                {this.renderExams()}
                {this.renderAssignments()}
                <FormLabel>ExamName</FormLabel>
                <FormInput onChangeText={
                    text => this.setState({newWidgetName: text})
                }/>
                <Picker
                    selectedValue={this.state.widgetType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}>
                    <Picker.Item value="Exam" label="Exam"/>
                    <Picker.Item value="Assignment" label="Assignment"/>
                </Picker>
                <Button
                    onPress={this.createWidget}
                    backgroundColor="green"
                    color="white"
                    title="Add"/>
            </View>
        )
    }
}

export default WidgetList