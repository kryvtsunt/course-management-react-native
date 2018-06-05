import 'es6-symbol/implement';

const QUESTION_URL =
    'http://10.110.209.150:8080/api/exam/EID/question';
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

}