import 'es6-symbol/implement';

// const Topic_API_URL =
//     'https://tk-course-management.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';


const HOST = 'http://10.0.0.164:8080';
const Topic_API_URL =
    HOST + '/api/course/CID/module/MID/lesson/LID/topic';

let _singleton = Symbol();

export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }


    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(Topic_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

}
