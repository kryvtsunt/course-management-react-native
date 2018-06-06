import React from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, ListItem, Icon} from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = {title: "Multiple Choice"}

    constructor(props) {
        super(props)
        this.questionService = QuestionService.instance
        this.state = {
            id: '',
            title: '',
            subtitle: '',
            description: '',
            points: 0,
            option: '',
            value: 0,
            options: []
        }

        this.updateForm = this.updateForm.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        //this.renderOptions = this.renderOptions.bind(this)
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
        this.questionService.findQuestionMC(questionId)
            .then((question) => {
                this.updateForm({id: question.id})
                this.updateForm({title: question.title})
                this.updateForm({subtitle: question.subtitle})
                this.updateForm({description: question.description})
                this.updateForm({points: question.points})
                if (question.options !== undefined) {
                    // console.log("tut" + question.options)
                    this.updateForm({
                        options: question.options.split(',').map((item, index) => ({
                            label: item,
                            value: index
                        }))
                    })
                }
                // console.log("tut" + this.state.options)
                this.updateForm({value: question.correctOption})
            })
    }

    updateQuestion() {
        let question = {};
        question.id = this.state.id
        question.title = this.state.title
        question.subtitle = this.state.subtitle
        question.description = this.state.description
        question.points = this.state.points
        question.options = this.state.options.map((item) => item.label).toString()
        console.log(this.state.options)
        console.log(question.options)
        question.correctOption = this.state.value
        this.questionService.updateMC(this.state.id, question)
    }

    // renderOptions() {
    //     return this.state.options.map(
    //         (option, index) => (
    //             <ListItem
    //                 onPress={() => {
    //                 }}
    //                 key={index}
    //                 title={option}
    //                 leftIcon={{name: "close", color: "red"}}
    //                 rightIcon={<Icon name={'check'} size={20}/>}
    //                 // leftIconOnPress={}
    //             />))
    // }

    render() {

        return (
            <ScrollView>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text h1>{this.state.title}   | {this.state.points}</Text>
                    <Text h2>{this.state.subtitle}</Text>
                    <Text h4>{this.state.description}</Text>
                    <Text>{'\n'}</Text>
                    {/*{this.renderOptions()}*/}
                    <View>
                        <RadioForm
                            radio_props={this.state.options}
                            initial={this.state.value}
                            onPress={(value) => {
                                console.log(value)
                                this.setState({value: value})
                            }}
                        />
                    </View>
                    <Icon
                        raised
                        color='#f50'
                        size={15}
                        name='times'
                        type='font-awesome'
                        onPress={() => this.updateForm({options: this.state.options.slice(0, -1)})}
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
                    defaultValue={this.state.points}
                    onChangeText={
                    points => this.updateForm({points: points})
                }/>


                <FormLabel>Add new choice</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({option: text})
                }/>


                <Button backgroundColor="blue"
                        color="white"
                        title="Add Choice"
                        onPress={() => {
                            let newprops = this.state.options
                            newprops.push({
                                label: this.state.option,
                                value: this.state.options.length
                            })
                            return this.updateForm({options: newprops})
                        }
                        }
                />
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

export default MultipleChoiceQuestionEditor