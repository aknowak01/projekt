import CategoryDAO from "../DAO/categoryDAO";
import QuestionDAO from "../DAO/questionDAO";

const create = () => {
    const query = async () => {
        const result = CategoryDAO.query();
        if (result) {
            return result;
        }
    };

    const createNewOrUpdate = async (data) => {
        const result = await CategoryDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    };

    const deleteCategory = async (categoryId) => {
        const result1 = await CategoryDAO.deleteCategory(categoryId);
        const result2 = await QuestionDAO.deleteAllQuestionsForCategory(categoryId);
        if (result1 && result2) {
            return result1;
        }
    };

    const getCategoryById = async (categoryId) => {
        const result = await CategoryDAO.getCategoryById(categoryId);
        if (result) {
            return result;
        }
    };

    return {
        query, createNewOrUpdate, deleteCategory, getCategoryById,
    };
};

export default {
    create,
};
