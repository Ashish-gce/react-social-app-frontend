//  if we don't login then this page "redirect" to login page

import React from "react";

import { Route, Navigate } from "react-router-dom";
import * as userUtil from "./userUtil";

let PrivateRoute = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // if user is not logged-in then redirect to logged-in page.
        return !userUtil.isLoggedIn() ? (
          <Navigate to="/users/login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PrivateRoute;

// let PrivateOutlet = () => {
//     const auth = useAuth();
//     return !userUtil.isLoggedIn() ? <Outlet /> : <Navigate to="/users/login" />;
//   }

//   function App() {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/private-outlet" element={<PrivateOutlet />}>
//             <Route element={<Private />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     );
//   }

// function PrivateOutlet() {
//     const auth = useAuth();
//     return auth ? <Outlet /> : <Navigate to="/login" />;
//   }

//   function App() {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/private-outlet" element={<PrivateOutlet />}>
//             <Route element={<Private />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     );
//   }
