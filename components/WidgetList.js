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
            courseId: 1,
            moduleId: 1,
            topicId: 1,
            widgetType: 'Exam',
            newWidgetName: ''
        }
        this.findAllWidgetsForTopic = this.findAllWidgetsForTopic.bind(this);
        this.renderWidgets = this.renderWidgets.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.createExam = this.createExam.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.navigateExam = this.navigateExam.bind(this);
        this.navigateAssignment = this.navigateAssignment.bind(this);
        this.navigator = this.navigator.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId: topicId})
        this.findAllWidgetsForTopic(topicId);
    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId: topicId})
        this.findAllWidgetsForTopic(topicId);
    }

    findAllWidgetsForTopic(topicId) {
        this.widgetService.findAllWidgetsForTopic(topicId)
            .then(widgets => this.setState({widgets}))
    }

    renderWidgets() {
        return this.state.widgets.map(
            (widget, index) => (
                <ListItem
                    onPress={this.navigator}
                    key={index}
                    title={widget.name}
                    />))
    }

    navigator(){
        if (widget.widgetType === "Exam"){
            this.navigateExam();
        } else if (widget.widgetType === "Assignment"){
            this.navigateAssignment();
        }

    }

    navigateExam(){
        this.props.navigation.navigate("ExamEditor", {examId: widget.id})
    }

    navigateAssignment(){
        this.props.navigation.navigate("AssignmentEditor", {assignmentId: widget.id})
    }

    createWidget() {
        if (this.state.widgetType === "Exam") {
            this.createExam();
        } else if (this.state.widgetType === "Assignment"){
            this.createAssignment();
        }
    }

    createExam() {
        let addWidget = {name: 'New Exam'};
        if (this.state.newWidgetName !== '') {
            addWidget.name = this.state.newWidgetName;
        }
        this.widgetService.createExam(this.state.topicId, addWidget)
            .then((exam) => {
                this.findAllWidgetsForTopic(this.state.topicId);
            });
    }

    createAssignment() {
        let addWidget = {name: 'New Assignment'};
        if (this.state.newWidgetName !== '') {
            addWidget.name = this.state.newWidgetName;
        }
        this.widgetService.createAssignment(this.state.topicId, addWidget)
            .then((exam) => {
                this.findAllWidgetsForTopic(this.state.topicId);
            });
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderWidgets()}

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