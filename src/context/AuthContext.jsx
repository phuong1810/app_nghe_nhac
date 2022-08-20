// import React, { useReducer, createContext } from 'react';
// import { setToken, setTokenUser, getTokenUser } from "../util/authClient";

// export const AuthContext = createContext();
// const dataUser = getTokenUser();
// console.log("dataUser", dataUser);
// const initialState = dataUser ? {
//     data: dataUser,
//     error: null,
// } : {
//     data: null,
//     error: null,
// }
// const useSafeDispatch = (dispatch) => {
//     const mounted = React.useRef(false);
//     React.useLayoutEffect(() => {
//         mounted.current = true;
//         return () => {
//             mounted.current = false;
//         };
//     }, []);
//     return React.useCallback((...args) => (mounted.current ? dispatch(...args) : null), [dispatch]);
// }
// const useAsync = () => {
//     const [{ data, error }, setState] = React.useReducer(
//         (s, a) => ({
//             ...s,
//             ...a,
//         }),
//         initialState
//     )
//     const safeSetState = useSafeDispatch(setState);
//     const setData = React.useCallback(
//         (data) =>
//         safeSetState({
//             data,
//         }), [safeSetState]
//     );
//     return {
//         error,
//         data,
//         setData
//     }
// }
// export const AuthContainer = ({ children }) => {
//     const [loading, setLoading] = useState(false)
//     const { setData, data } = useAsync();
//     const [user, setUser] = useState(dataUser || {});
//     const login = useCallback(async(form) => {
//         try {
//             setLoading(false)
//             const { result } = await services.login(form);
//             if (!result) {
//                 return;
//             }
//             setToken({ token: result.accessToken });
//             const { result: dataUser } = await services.getUser();
//             setData(dataUser?.user);
//             setTokenUser(dataUser?.user);
//             message.success("Đăng nhập thành công!", 1.5);
//         } catch (error) {
//             console.log(error);
//             message.error(error?.data?.error?.Providermessage, 1.5);
//         } finally {
//             setLoading(false)
//         }
//     }, [setData])
//     useEffect(() => {
//         setUser(data ? {...data } : {});
//     }, [data])
//     const logout = useCallback(() => {
//         cookie.remove("token");
//         cookie.remove("user");
//         cookie.remove("view-360");
//         cookie.remove("live-stream");
//         setData({})
//     }, [setData])
//     const authContextValue = useMemo(() => ({
//         user,
//         login,
//         logout,
//         loading,
//     }), [loading, login, logout, user])

//     return ( <AuthContext.Provider value = { authContextValue } > { children } </AuthContext.Provider>
//     )
// }