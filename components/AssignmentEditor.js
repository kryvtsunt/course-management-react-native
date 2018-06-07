import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, ListItem, Icon} from 'react-native-elements'
import WidgetService from "../services/WidgetService";


class AssignmentEditor extends React.Component {
    static navigationOptions = {title: "AssignmentEditor"}

    constructor(props) {
        super(props)
        this.widgetService = WidgetService.instance
        this.state = {
            id: '',
            title: '',
            description: '',
            points: '0'
        }

        this.updateForm = this.updateForm.bind(this)
        this.updateAssignment = this.updateAssignment.bind(this)
        this.findAssignment = this.findAssignment.bind(this)
    }

    componentWillMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId")
        this.findAssignment(assignmentId);

    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId")
        this.findAssignment(assignmentId);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    findAssignment(assignmentId) {
        this.widgetService.findAssignment(assignmentId)
            .then((assignment) => {
                this.updateForm({id: assignment.id})
                this.updateForm({title: assignment.title})
                this.updateForm({description: assignment.description})
                this.updateForm({points: assignment.points})
            })
    }

    updateAssignment() {
        let assignment = {};
        assignment.id = this.state.id
        assignment.title = this.state.title
        assignment.description = this.state.description
        assignment.points = this.state.points
        this.widgetService.updateAssignment(this.state.id, assignment)
        this.props.navigation.goBack();
    }


    render() {

        return (
            <ScrollView>
                <Text h4 style={{padding: 10, backgroundColor: 'white'}}>Preview</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }}
                />
                <Text>{'\n'}</Text>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text h3> {this.state.title} | {this.state.points}</Text>
                    <Text h4>{this.state.description}</Text>
                    <Text>{'\n'}</Text>

                    <TextInput editable={false} selectTextOnFocus={false}
                               style={{
                                   padding: 15,
                                   height: 150,
                                   width: 250,
                                   backgroundColor: 'white',
                                   borderColor: 'gray',
                                   borderWidth: 2
                               }}
                               placeholder="Type your answer for the assignment"
                    />
                </View>

                <Text>{'\n'}</Text>
                <Text h4 style={{padding: 10, backgroundColor: 'white'}}>Edit</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }}
                />
                <FormLabel>Title</FormLabel>
                <FormInput
                    defaultValue={this.state.title}
                    onChangeText={
                        text => this.updateForm({title: text})
                    }/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    defaultValue={this.state.description}
                    onChangeText={
                        text => this.updateForm({description: text})
                    }/>


                <FormLabel>Number of points</FormLabel>
                <FormInput
                    onChangeText={
                        points => this.updateForm({points: points})
                    }/>

                <Text>{'\n'}</Text>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        buttonStyle={{
                            backgroundColor: "green",
                            width: 250,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            padding: 5,
                            margin: 5,
                        }}
                        color="white"
                        title="Save"
                        onPress={this.updateAssignment}/>
                    <Button
                        buttonStyle={{
                            backgroundColor: "red",
                            width: 250,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            padding: 5,
                            margin: 5,
                        }}
                        color="white"
                        title="Cancel"
                        onPress={() => this.props
                            .navigation
                            .goBack()}/>
                </View>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
            </ScrollView>
        )
    }
}

export default AssignmentEditor