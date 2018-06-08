import 'es6-symbol/implement';

// 'https://tk-course-management.herokuapp.com/api/topic/TID/widget';


const HOST = 'http://10.0.0.164:8080';
const WIDGET_URL =
    HOST + '/api/topic/TID/widget';
const EXAM_URL =
    HOST + '/api/topic/TID/exam';
const ASSIGNMENT_URL =
    HOST + '/api/topic/TID/assignment';
const E_URL =
    HOST + '/api/exam/EID';
const A_URL =
    HOST + '/api/assignment/AID';

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

    findAllExamsForTopic(topicId) {
        return fetch(EXAM_URL.replace('TID', topicId))
            .then(response => (response.json()))
    }

    findAllAssignmentsForTopic(topicId) {
        return fetch(ASSIGNMENT_URL.replace('TID', topicId))
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

    deleteExam(examId) {
        return fetch(E_URL.replace('EID', examId),
            {
                method: 'DELETE'
            })
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

    deleteAssignment(assignmentId) {
        return fetch(A_URL.replace('AID', assignmentId),
            {
                method: 'DELETE'
            })
    }

    updateAssignment(assignmentId, assignment) {
        return fetch(A_URL.replace('AID', assignmentId),
            {
                body: JSON.stringify(assignment),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
    }

    findAssignment(assignmentId) {
        return fetch(A_URL.replace('AID', assignmentId))
            .then(response => (response.json()))
    }


}