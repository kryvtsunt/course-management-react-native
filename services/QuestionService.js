import 'es6-symbol/implement';

// 'https://tk-course-management.herokuapp.com/api/topic/TID/widget';

const HOST = 'http://10.0.0.164:8080';

const QUESTION_URL =
    HOST+'/api/exam/EID/question';
const Q_URL =
    HOST+'/api/question/QID';


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
        return fetch(Q_URL.replace('question','questionMC').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionES(questionId) {
        return fetch(Q_URL.replace('question','questionES').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionFB(questionId) {
        return fetch(Q_URL.replace('question','questionFB').replace('QID', questionId))
            .then(response => (response.json()))
    }

    findQuestionTF(questionId) {
        return fetch(Q_URL.replace('question','questionTF').replace('QID', questionId))
            .then(response => (response.json()))
    }

    createMC(examId, question) {
        return fetch((QUESTION_URL + 'MC').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    createTF(examId, question) {
        return fetch((QUESTION_URL + 'TF').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    createFB(examId, question) {
        return fetch((QUESTION_URL + 'FB').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }
    createES(examId, question) {
        return fetch((QUESTION_URL + 'ES').replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    deleteMC(questionId) {
        return fetch(Q_URL.replace('question','questionMC').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    deleteTF(questionId) {
        return fetch(Q_URL.replace('question','questionTF').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }
    deleteFB(questionId) {
        return fetch(Q_URL.replace('question','questionFB').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    deleteES(questionId) {
        return fetch(Q_URL.replace('question','questionES').replace('QID', questionId),
            {
                method: 'DELETE'
            })
    }

    updateMC(questionId, question) {
        return fetch((Q_URL.replace('question','questionMC').replace('QID', questionId)),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

    updateES(questionId, question) {
        return fetch((Q_URL.replace('question','questionES').replace('QID', questionId)),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

    updateTF(questionId, question) {
        return fetch((Q_URL.replace('question','questionTF').replace('QID', questionId)),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

    updateFB(questionId, question) {
        return fetch((Q_URL.replace('question','questionFB').replace('QID', questionId)),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

}