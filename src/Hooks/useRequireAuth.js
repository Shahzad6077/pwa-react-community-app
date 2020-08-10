import { useEffect } from "react";
import { useAuth } from "./useFirebase";
import useRouter from "./useRouter";

const useRequireAuth = (redirecURL = "/login", type = false) => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (type == false && auth.user === false) {
      router.history.push(redirecURL);
    } else if (type === true && auth.user) {
      router.history.push(redirecURL);
    }
    return () => {};
  }, [auth, redirecURL]);
  return auth;
};

export default useRequireAuth;
