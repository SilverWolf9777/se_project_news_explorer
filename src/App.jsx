import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "./components/Contexts/CurrentUserContext";
import { ApiRequestContext } from "./components/Contexts/apiRequestContext";

import "./App.css";
import "./index.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Preloader from "./components/Preloader/Preloader";
import News from "./components/News/News";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [openedModal, setOpenedModal] = useState("");
  const [cardArray, setCardArray] = useState([]);
  const [hasSearched, setHasSearched] = useState("");
  const [apiRequestData, setApiRequestData] = useState({
    q: "",
    sortBy: "popularity",
    apiKey: "09a571dd969f418797b2223f529f5110",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const handleCloseClick = () => {
    setOpenedModal(null);
  };
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";
  useEffect(() => {
    setHasSearched("");
    setCardArray([]);
  }, [isSavedNews]);
  async function onSearchClick() {
    try {
      setIsLoading(true);
      setSearchError(null);
      const { q, sortBy, apiKey } = apiRequestData;
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const format = (d) => d.toISOString().split("T")[0];
      setHasSearched(q);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&from=${format(sevenDaysAgo)}&to=${format(today)}&sortBy=${sortBy}&apiKey=${apiKey}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      const enrichedArticles = data.articles.map((article) => ({
        ...article,
        keyword: q,
      }));

      setCardArray(enrichedArticles);
    } catch (err) {
      console.error("Error", err);
      if (err.message === "404") {
        setSearchError("not_found");
      } else {
        setSearchError("error");
      }
      setCardArray([]);
    } finally {
      setIsLoading(false);
    }
  }
  function handleRegister(values) {
    const { username, email, password } = values;

    const newUser = {
      name: username,
      email,
      password,
      articles: [],
    };

    setUsers((prevUsers) => ({
      ...prevUsers,
      [username.toLowerCase()]: newUser,
    }));

    setCurrentUser(newUser);
    setIsLoggedIn(true);

    return Promise.resolve(newUser);
  }
  function handleLogin(values) {
    const user = Object.values(users).find(
      (u) => u.email === values.email && u.password === values.password,
    );

    if (!user) {
      console.log("Invalid login");
      return Promise.reject();
    }

    setCurrentUser(user);
    setIsLoggedIn(true);
    return Promise.resolve(user);
  }
  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  }

  function handleRemoveClick(article) {
    setCurrentUser((prevUser) => {
      if (!prevUser) return prevUser;

      return {
        ...prevUser,
        articles: prevUser.articles.filter((a) => a.url !== article.url),
      };
    });
  }
  function handleBookmarkClick(article) {
    setCurrentUser((prevUser) => {
      if (!prevUser) return prevUser;

      const articles = prevUser.articles || [];

      const isAlreadySaved = articles.some((a) => a.url === article.url);

      return {
        ...prevUser,
        articles: isAlreadySaved
          ? articles.filter((a) => a.url !== article.url) // remove
          : [...articles, article], // add
      };
    });
  }

  return (
    <ApiRequestContext.Provider value={{ apiRequestData, setApiRequestData }}>
      <CurrentUserContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <Main
          onSearchClick={onSearchClick}
          onRemoveClick={handleRemoveClick}
          onBookmarkClick={handleBookmarkClick}
          savedNews={currentUser?.articles}
          q={apiRequestData.q}
        >
          <Header handleLogout={handleLogout} setOpenedModal={setOpenedModal} />
        </Main>
        {hasSearched === "" ? (
          <></>
        ) : (
          <>
            {isLoading && <Preloader />}
            <News
              cardArray={cardArray}
              onRemoveClick={handleRemoveClick}
              onBookmarkClick={handleBookmarkClick}
              q={apiRequestData.q}
            ></News>
          </>
        )}
        <LoginModal
          openedModal={openedModal}
          handleCloseClick={handleCloseClick}
          setOpenedModal={setOpenedModal}
          onLogin={handleLogin}
        ></LoginModal>
        <RegisterModal
          onRegister={handleRegister}
          openedModal={openedModal}
          handleCloseClick={handleCloseClick}
          setOpenedModal={setOpenedModal}
        ></RegisterModal>
        {isSavedNews ? <></> : <About />}
        <Footer />
      </CurrentUserContext.Provider>
    </ApiRequestContext.Provider>
  );
}

export default App;
