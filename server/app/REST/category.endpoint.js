import business from "../business/business.containter";
import applicationException from "../service/applicationException";
import authentication from "../middleware/authentication";

const categoryEndpoint = (router) => {
    router.get("/api/categories", async (request, response, next) => {
        try {
            const result = await business.getCategoryManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.post("/api/category", authentication, async (request, response, next) => {
        try {
            const data = request.body;
            const result = await business
                .getCategoryManager()
                .createNewOrUpdate(data);
            response.status(201).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.delete("/api/category/:categoryId", authentication, async (request, response, next) => {
        try {
            const categoryId = request.params.categoryId;
            const result = await business
                .getCategoryManager()
                .deleteCategory(categoryId);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });

    router.get("/api/category/:categoryId", authentication, async (request, response, next) => {
        try {
            const categoryId = request.params.categoryId;
            const result = await business
                .getCategoryManager()
                .getCategoryById(categoryId);
            response.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    });
};

export default categoryEndpoint;
