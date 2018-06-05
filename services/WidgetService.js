import 'es6-symbol/implement';

const WIDGET_URL =
    'http://10.110.209.150:8080/api/topic/TID/widget';
const EXAM_URL =
    'http://10.110.209.150:8080/api/topic/TID/exam';
const ASSIGNMENT_URL =
    'http://10.110.209.150:8080/api/topic/TID/assignment';
// 'https://tk-course-management.herokuapp.com/api/topic/TID/widget';


let _singleton = Symbol();

export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    findAllWidgetsForTopic(topicId) {
        return fetch(WIDGET_URL.replace('TID', topicId))
            .then(response => (response.json()))
    }

    createExam(topicId, exam) {
        return fetch(EXAM_URL.replace('TID', topicId),
            {
                body: JSON.stringify(exam),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

    createAssignment(topicId, assignment) {
        return fetch(ASSIGNMENT_URL.replace('TID', topicId),
            {
                body: JSON.stringify(assignment),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(response => (response.json()))
    }

}