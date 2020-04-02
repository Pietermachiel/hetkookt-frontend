import { useEffect } from "react";
import auth from "../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);

  return null;
};

export default Logout;

// class Logout extends Component {
//   UNSAFE_componentDidMount() {
//     auth.logout();

//     window.location = "/";
//   }

//   render() {
//     return null;
//   }
// }

// export default Logout;
