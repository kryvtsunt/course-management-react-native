import 'es6-symbol/implement';

// const MODULE_API_URL =
//     'https://tk-course-management.herokuapp.com/api/course/CID/module';



const MODULE_API_URL =
    'http://10.110.209.150:8080/api/course/CID/module';

let _singleton = Symbol();

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }


    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }
}


