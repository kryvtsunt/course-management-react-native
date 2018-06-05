import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class AssignmentEditor extends Component {
    static navigationOptions = {title: 'AssignmentEditor'}
    constructor(props) {
        super(props)
        this.questionService = QuestionService.instance
        this.state = {
            questions: [],
            examId: 1,
            questionType: 'MC'
        }
        this.findAllQuestionsForWidget = this.findAllQuestionsForWidget.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({examId: examId})
        this.findAllQuestionsForWidget(examId);

    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({examId: examId})
        this.findAllQuestionsForWidget(examId);
    }

    findAllQuestionsForWidget(examId){
        this.questionService.findAllQuestionsForWidget(examId)
            .then(questions => this.setState({questions}))
    }

    renderQuestions(){
        return this.state.questions.map(
            (question, index) => (
                <ListItem
                    onPress={() => {
                        if(question.type === "TrueFalse")
                            this.props.navigation
                                .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                        if(question.type === "MultipleChoice")
                            this.props.navigation
                                .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                    }}
                    key={index}
                    subtitle={question.description}
                    title={question.title}/>))
    }

    render() {
        return(
            <View style={{padding: 15}}>
                <Text> Assignment </Text>
                {this.renderQuestions()}

                <Picker
                    selectedValue={this.state.questionType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}>
                    <Picker.Item value="MC" label="Multiple choice"/>
                    <Picker.Item value="ES" label="Essay"/>
                    <Picker.Item value="TF" label="True or false"/>
                    <Picker.Item value="FB" label="Fill in the blanks"/>
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
export default AssignmentEditor