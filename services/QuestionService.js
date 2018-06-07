import 'es6-symbol/implement';
const HOST = 'http://10.0.0.164:8080';
const QUESTION_URL =
    HOST+'/api/exam/EID/question';
// 'https://tk-course-management.herokuapp.com/api/topic/TID/widget';


let _singleton = Symbol();

export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    findAllQuestionsForWidget(examId) {
        return fetch(QUESTION_URL.replace('EID', examId))
            .then(response => (response.json()))
    }

    findQuestionMC(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionMC/QID').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionES(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionES/QID').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionFB(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionFB/QID').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionTF(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionTF/QID').replace('QID', questionId))
            .then(response => (response.json()))
    }

    createMC(examId, question) {
        return fetch(('http://10.0.0.164:8080/api/exam/EID/questionMC').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    createTF(examId, question) {
        return fetch(('http://10.0.0.164:8080/api/exam/EID/questionTF').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    createFB(examId, question) {
        return fetch(('http://10.0.0.164:8080/api/exam/EID/questionFB').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }
    createES(examId, question) {
        return fetch(('http://10.0.0.164:8080/api/exam/EID/questionES').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    deleteMC(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionMC/QID').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    deleteTF(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionTF/QID').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }
    deleteFB(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionFB/QID').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    deleteES(questionId) {
        return fetch(('http://10.0.0.164:8080/api/questionES/QID').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    updateMC(questionId, question) {
        return fetch(('http://10.0.0.164:8080/api/questionMC/QID').replace('QID', questionId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

    updateES(questionId, question) {
        return fetch(('http://10.0.0.164:8080/api/questionES/QID').replace('QID', questionId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

}