/*local*/
// const baseUrl = "http://localhost:3000";

/*production*/
const baseUrl = "https://backend-la-jeune-fermiere-bdb33bb4de7a.herokuapp.com"

const loginAdminUrl = `${baseUrl}/api/admins/loginAdmin`;
const loginUserUrl = `${baseUrl}/api/user/loginUser`;
const getArticleUrl = `${baseUrl}/api/articles/getArticles`;
const createArticleUrl = `${baseUrl}/api/articles/createArticle`;
const updateArticleUrl = `${baseUrl}/api/articles/updateArticle`;
const deleteArticleUrl = `${baseUrl}/api/articles/deleteArticle`;
const createOrderUrl = `${baseUrl}/api/orders/createOrder`;
const getOrderUrl = `${baseUrl}/api/orders/getOrder`;
const updateStatusOrderUrl = `${baseUrl}/api/orders/updateOrder/status`;

export{
  loginAdminUrl,
  loginUserUrl,
  getArticleUrl,
  createOrderUrl,
  getOrderUrl,
  updateStatusOrderUrl,
  createArticleUrl,
  updateArticleUrl,
  deleteArticleUrl
}