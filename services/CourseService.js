import 'es6-symbol/implement';
// const COURSE_API_URL =
//     'https://tk-course-management.herokuapp.com/api/course';
const HOST = 'http://10.0.0.164:8080';
const COURSE_API_URL=
    HOST + '/api/course';

let _singleton = Symbol();

export default class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        console.log(COURSE_API_URL);
        return fetch(COURSE_API_URL)
            .then(response => (response.json()))
    }


}
