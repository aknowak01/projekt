import business from "../business/business.containter";
import applicationException from "../service/applicationException";
import authentication from "../middleware/authentication";

const questionEndpoint = (router) => {
    router.get("/api/questions", async (request, response, next) => {
        try {
            const result = await business.getQuestionManager().queryAllQuestions();
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.get("/api/questions/:categoryId", async (request, response, next) => {
        try {
            const categoryId = request.params.categoryId;
            const result = await business
                .getQuestionManager()
                .queryQuestionsFromCategory(categoryId);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.get("/api/questions/:categoryId/:limit", async (request, response, next) => {
        try {
            const categoryId = request.params.categoryId;
            const limit = request.params.limit;
            const result = await business
                .getQuestionManager()
                .queryAllQuestionsFromCategoryWithLimit(categoryId, limit);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.post("/api/question", authentication, async (request, response, next) => {
        try {
            const data = request.body;
            const result = await business
                .getQuestionManager()
                .createNewOrUpdate(data);
            response.status(201).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.delete("/api/question/:questionId", authentication, async (request, response, next) => {
        try {
            const questionId = request.params.questionId;
            const result = await business
                .getQuestionManager()
                .deleteQuestion(questionId);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.get("/api/question/:questionId", authentication, async (request, response, next) => {
        try {
            const questionId = request.params.questionId;
            const result = await business
                .getQuestionManager()
                .getQuestionById(questionId);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });
};

export default questionEndpoint;
