import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import Modal from "./pages/Modal.tsx";

const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "a85d61268971fc729cb5c874de03a02cfca708f83d4d87a7125e029d5985329462ea78909b8c4091a7d261bf77f25272e23992c1e98578967f47fb3c6bc3129d33e79a8e497d2c1afe73f31de41ad10b58812fe27e4f133abec968a0dde8e1a7e097ae8808f8dc6c946b778e71c0bbc758d7c03ddc1319cedc0af87f04f3c641";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/modal",
    element: <Modal />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ModalProvider>
        <ShoppingCartProvider>
          <RouterProvider router={router} />
        </ShoppingCartProvider>
      </ModalProvider>
    </AuthProvider>
  </ApolloProvider>
);
