import categoryEndpoint from "./category.endpoint";
import userEndpoint from "./user.endpoint";
import questionEndpoint from "./question.endpoint";

const routes = (router) => {
  categoryEndpoint(router);
  userEndpoint(router);
  questionEndpoint(router);
};

export default routes;
