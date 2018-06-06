import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class ExamEditor extends Component {
    static navigationOptions = {title: 'ExamEditor'}

    constructor(props) {
        super(props)
        this.questionService = QuestionService.instance
        this.state = {
            questions: [],
            examId: 1,
            questionType: 'MC',
            newQuestionTitle: ''
        }
        this.findAllQuestionsForWidget = this.findAllQuestionsForWidget.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.createMC = this.createMC.bind(this);
        this.createTF = this.createTF.bind(this);
        this.createES = this.createES.bind(this);
        this.createFB = this.createFB.bind(this);
        this.navigator = this.navigator.bind(this);
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

    findAllQuestionsForWidget(examId) {
        this.questionService.findAllQuestionsForWidget(examId)
            .then(questions => this.setState({questions}))
    }

    renderQuestions() {
        return this.state.questions.map(
            (question, index) => (
                <ListItem
                    onPress={() => {
                        this.navigator(question)
                    }}
                    key={index}
                    subtitle={question.description}
                    title={question.title}
                    leftIcon={{name: "close", color: "red"}}
                    leftIconOnPress={() => this.deleteQuestion(question)}
                />))
    }

    navigator(question) {
        if (question.type === "TF")
            this.props.navigation.navigate("TrueFalseQuestionEditor", {questionId: question.id})
        else if (question.type === "MC")
            this.props.navigation.navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
        else if (question.type === "Es")
            this.props.navigation.navigate("EssayQuestionEditor", {questionId: question.id})
        else if (question.type === "FB")
            this.props.navigation.navigate("FillBlanksQuestionEditor", {questionId: question.id})
    }

    createQuestion() {
        if (this.state.questionType === "MC") {
            this.createMC();
        } else if (this.state.questionType === "TF") {
            this.createTF();
        } else if (this.state.questionType === "ES") {
            this.createES();
        } else if (this.state.questionType === "FB") {
            this.createFB();
        }
    }

    deleteQuestion(question) {
        if (question.type === "MC") {
            this.deleteMC(question);
        } else if (question.type === "TF") {
            this.deleteTF(question);
        } else if (question.type === "ES") {
            this.deleteES(question);
        } else if (question.type === "FB") {
            this.deleteFB(question);
        }
    }

    deleteMC(question) {
        this.questionService.deleteMC(question.id).then(() => {
            this.findAllQuestionsForWidget(this.state.examId);
        })
    }

    deleteTF(question) {
        this.questionService.deleteTF(question.id).then(() => {
            this.findAllQuestionsForWidget(this.state.examId);
        })
    }

    deleteFB(question) {
        this.questionService.deleteFB(question.id).then(() => {
            this.findAllQuestionsForWidget(this.state.examId);
        })
    }

    deleteES(question) {
        this.questionService.deleteES(question.id).then(() => {
            this.findAllQuestionsForWidget(this.state.examId);
        })
    }

    createMC() {
        let addQuestion = {title: 'New MC Question'};
        if (this.state.newQuestionTitle !== '') {
            addQuestion.title = this.state.newQuestionTitle;
        }
        this.questionService.createMC(this.state.examId, addQuestion)
            .then(() => {
                this.findAllQuestionsForWidget(this.state.examId);
            });
    }

    createTF() {
        let addQuestion = {title: 'New TF Question'};
        if (this.state.newQuestionTitle !== '') {
            addQuestion.title = this.state.newQuestionTitle;
        }
        this.questionService.createTF(this.state.examId, addQuestion)
            .then(() => {
                this.findAllQuestionsForWidget(this.state.examId);
            });
    }

    createES() {
        let addQuestion = {title: 'New ES Question'};
        if (this.state.newQuestionTitle !== '') {
            addQuestion.title = this.state.newQuestionTitle;
        }
        this.questionService.createES(this.state.examId, addQuestion)
            .then(() => {
                this.findAllQuestionsForWidget(this.state.examId);
            });
    }

    createFB() {
        let addQuestion = {title: 'New FB Question'};
        if (this.state.newQuestionTitle !== '') {
            addQuestion.title = this.state.newQuestionTitle;
        }
        this.questionService.createFB(this.state.examId, addQuestion)
            .then(() => {
                this.findAllQuestionsForWidget(this.state.examId);
            });
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.renderQuestions()}

                <FormLabel>QuestionName</FormLabel>
                <FormInput onChangeText={
                    text => this.setState({newQuestionTitle: text})
                }/>
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
                    onPress={this.createQuestion}
                    backgroundColor="green"
                    color="white"
                    title="Add"/>
            </View>
        )
    }
}

export default ExamEditor