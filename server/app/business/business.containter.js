import userManager from "./user.manager";
import questionManager from "./question.manager";
import categoryManager from "./category.manager";

function getter(manager, request) {
    return function () {
        return manager.create(request, this);
    };
}

export default {
    getUserManager: getter(userManager),
    getQuestionManager: getter(questionManager),
    getCategoryManager: getter(categoryManager),
};
