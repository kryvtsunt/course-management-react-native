import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, ListItem, Icon} from 'react-native-elements'
import QuestionService from "../services/QuestionService";


class TrueFalseQuestionEditor extends React.Component {
    static navigationOptions = {title: "True or False"}

    constructor(props) {
        super(props)
        this.questionService = QuestionService.instance
        this.state = {
            id: '',
            title: '',
            subtitle: '',
            description: '',
            points: 0,
            isTrue: false
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
        this.questionService.findQuestionTF(questionId)
            .then((question) => {
                this.updateForm({id: question.id})
                this.updateForm({title: question.title})
                this.updateForm({subtitle: question.subtitle})
                this.updateForm({description: question.description})
                this.updateForm({points: question.points})
                if (question.isTrue !== undefined) {
                    this.updateForm({isTrue: question.isTrue})
                }
            })
    }

    updateQuestion() {
        let question = {};
        question.id = this.state.id
        question.title = this.state.title
        question.subtitle = this.state.subtitle
        question.description = this.state.description
        question.points = this.state.points
        question.isTrue = this.state.isTrue
        this.questionService.updateTF(this.state.id, question)
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
                    <Text h3 style={{
                        marginHorizontal: 30,
                        marginVertical: 3
                    }}>{this.state.title} | {this.state.points}</Text>
                    <Text h4 style={{
                        marginHorizontal: 40,
                        marginVertical: 3
                    }}>{this.state.subtitle}</Text>
                    <Text h5 style={{
                        marginHorizontal: 50,
                        marginVertical: 5
                    }}>{this.state.description}</Text>
                    <Text>{'\n'}</Text>
                    <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue} title='The answer is true'/>
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
                        onPress={this.updateQuestion}/>
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


export default TrueFalseQuestionEditor