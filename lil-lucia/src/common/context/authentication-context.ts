import { createContext } from "react";
import { User } from "../../models/user";

interface userContext {
  isLoggedIn: boolean,
  user: User,
  login: (user: User) => void,
  logout: () => void,
}

export const AuthContext = createContext<userContext>({
  isLoggedIn: false,
  user: new User(),
  login: () => null,
  logout: () => {}
});
