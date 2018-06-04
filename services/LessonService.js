const Lesson_API_URL =
    'https://tk-course-management.herokuapp.com/api/course/CID/module/MID/lesson';
// const Lesson_API_URL =
//     'http://localhost:8080/api/course/CID/module/MID/lesson';

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

    // findAllLessons() {
    //     return fetch('http://localhost:8080/api/lesson')
    //         .then(function (response) {
    //             return response.json();
    //         })
    // }


    createLesson(courseId, moduleId, lesson) {
        return fetch(Lesson_API_URL.replace('CID', courseId).replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

    deleteLesson(courseId, moduleId, lessonId) {
        return fetch(Lesson_API_URL.replace('CID', courseId).replace('MID', moduleId)+ '/' + lessonId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }
}
