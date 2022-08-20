// import jwt from "jsonwebtoken";
// import cookie from "js-cookie";
// export const setToken = ({ token }) => {
//   try {
//     const { exp } = jwt.decode(token);
//     const expires = new Date(exp * 1000);
//     cookie.set("token", token, { expires });
//   } catch (error) {

//   }
// };
// export const setTokenUser = (user) => {
//   cookie.set("user", JSON.stringify(user));
// };
// export const getTokenUser = () => {
//   let user = cookie.get("user");
//   return user != null ? JSON.parse(user) : null;
// }
// export const logout = (redirect = "/admin") => {
//   cookie.remove("token");
//   // to support logging out from all windows
//   window.localStorage.setItem("logout", Date.now());
// };