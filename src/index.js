import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/homePage";
import { Signin, Signup } from "./pages/authPage";
import HospitalData from "./pages/hospitalDataPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StepFive, StepOne, StepFour, StepThree, StepTwo } from "./forms";
import { removeAuthentication } from "./services/allServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "hospital-data",
    element: <HospitalData />,
    children: [
      {
        path: "",
        element: <StepOne />,
      },
      {
        path: "1",
        element: <StepTwo />,
      },
      {
        path: "2",
        element: <StepThree />,
      },
      {
        path: "3",
        element: <StepFour />,
      },
      {
        path: "4",
        element: <StepFive />,
      },
    ],
  },
  {
    path: "register",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Signin />,
  },
]);

const Header = () => {
  return (
    <header>
      <h1 onClick={() => window.location.replace("/")}>Mboalab</h1>
    </header>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Header />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
