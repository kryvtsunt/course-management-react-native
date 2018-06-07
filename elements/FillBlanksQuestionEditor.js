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
            points: '0',
            blank: '',
            output: '',
            inputs: []
        }

        this.updateForm = this.updateForm.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.findQuestion = this.findQuestion.bind(this)
        this.getBlank = this.getBlank.bind(this)
        this.renderInputs = this.renderInputs.bind(this)
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
        this.questionService.findQuestionFB(questionId)
            .then((question) => {
                this.updateForm({id: question.id})
                this.updateForm({title: question.title})
                this.updateForm({subtitle: question.subtitle})
                this.updateForm({description: question.description})
                this.updateForm({points: question.points})
                this.updateForm({blank: question.blank})
            })
    }

    getBlank() {
        let output = this.state.blank.replace(/\[(.+?)\]/g, " [ ... ] ")
        this.updateForm({output: output})
        let rxp = /\[(.*?)\]/g
        let str = this.state.blank
        let curMatch;
        let inputs = [];
        while (curMatch = rxp.exec(str)) {
            inputs.push(curMatch[1]);
        }
        this.updateForm({inputs: inputs})
    }

    updateQuestion() {
        let question = {};
        question.id = this.state.id
        question.title = this.state.title
        question.subtitle = this.state.subtitle
        question.description = this.state.description
        question.points = this.state.points
        question.blank = this.state.blank
        this.questionService.updateFB(this.state.id, question)
        this.props.navigation.goBack();
    }

    renderInputs() {
        return this.state.inputs.map(
            (input, index) => (
                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    key={index}
                    style={{
                        padding: 3,
                        height: 30,
                        width: 150,
                        margin: 3,
                        backgroundColor: 'white',
                        borderColor: 'gray',
                        borderWidth: 2,
                    }}
                    placeholder={' [ ' + input + ' ]'}
                />))
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
                    <Text h3>{this.state.title} | {this.state.points}</Text>
                    <Text h4>{this.state.subtitle}</Text>
                    <Text h5>{this.state.description}</Text>
                    <Text
                        style={{
                            marginHorizontal: 80,
                            marginVertical: 20
                        }}
                    >{this.state.output}</Text>
                    {this.renderInputs()}
                    <Icon
                        raised
                        color='#f50'
                        size={15}
                        name='code'
                        type='font-awesome'
                        onPress={() => this.getBlank()}
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
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <TextInput
                        style={{
                            padding: 15,
                            height: 100,
                            width: 250,
                            backgroundColor: 'white',
                            borderColor: 'gray',
                            borderWidth: 1
                        }}
                        value={this.state.blank}
                        placeholder="Blank editor"
                        onChangeText={(blank) => this.updateForm({blank: blank})}
                        multiline={true}
                    />
                </View>

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

export default FillBlanksQuestionEditor