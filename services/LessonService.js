import 'es6-symbol/implement';
// const Lesson_API_URL =
//     'https://tk-course-management.herokuapp.com/api/course/CID/module/MID/lesson';


const HOST = 'http://10.110.209.150:8080';
const Lesson_API_URL =
    HOST + '/api/course/CID/module/MID/lesson';

let _singleton = Symbol();

export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }


    findAllLessonsForModule(courseId, moduleId) {
        return fetch(Lesson_API_URL.replace('CID', courseId).replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }
}