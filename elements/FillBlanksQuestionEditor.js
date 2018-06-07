import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, ListItem, Icon} from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class FillBlanksQuestionEditor extends React.Component {
    static navigationOptions = {title: "Fill the blanks"}

    constructor(props) {
        super(props)
        this.questionService = QuestionService.instance
        this.state = {
            id: '',
            title: '',
            subtitle: '',
            description: '',
            points: 0
        }

        this.updateForm = this.updateForm.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.findQuestion = this.findQuestion.bind(this)
    }

    componentWillMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.findQuestion(questionId);

    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.findQuestion(questionId);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    findQuestion(questionId) {
        this.questionService.findQuestionES(questionId)
            .then((question) => {
                this.updateForm({id: question.id})
                this.updateForm({title: question.title})
                this.updateForm({subtitle: question.subtitle})
                this.updateForm({description: question.description})
                this.updateForm({points: question.points})
            })
    }

    updateQuestion() {
        let question = {};
        question.id = this.state.id
        question.title = this.state.title
        question.subtitle = this.state.subtitle
        question.description = this.state.description
        question.points = this.state.points
        this.questionService.updateES(this.state.id, question)
    }


    render() {

        return (
            <ScrollView>
                <Text h4>Preview</Text>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text h3>{this.state.title} | {this.state.points}</Text>
                    <Text h4>{this.state.subtitle}</Text>
                    <Text h5>{this.state.description}</Text>
                    <Text>{'\n'}</Text>

                    <TextInput
                        style={{height: 60}}
                        placeholder="Type your answer to the essay question"
                    />
                </View>

                <Text>{'\n'}</Text>
                <Text h4>Edit</Text>
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

                <FormLabel>Subtitle</FormLabel>
                <FormInput
                    defaultValue={this.state.subtitle}
                    onChangeText={
                        text => this.updateForm({subtitle: text})
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
                <Text>{'\n'}</Text>
                <Button backgroundColor="green"
                        color="white"
                        title="Save"
                        onPress={this.updateQuestion}/>
                <Button backgroundColor="red"
                        color="white"
                        title="Cancel"
                        onPress={() =>this.props
                            .navigation
                            .goBack()}/>

                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
            </ScrollView>
        )
    }
}

export default FillBlanksQuestionEditor