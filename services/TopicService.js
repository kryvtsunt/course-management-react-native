const Topic_API_URL =
    'https://tk-course-management.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';
// const Topic_API_URL =
//     'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic';

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


    findAllTopics(courseId, moduleId, lessonId) {
        return fetch(Topic_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }


    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(Topic_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId),
            {
                body: JSON.stringify(topic),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

    deleteTopic(courseId, moduleId, lessonId, topicId) {
        return fetch(Topic_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId) + '/' + topicId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }
}
