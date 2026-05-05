import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [openedModal, setOpenedModal] = useState("signin");
  const [cardArray, setCardArray] = useState([]);
  const [apiRequestData, setApiRequestData] = useState({
    q: "",
    sortBy: "popularity",
    apiKey: "09a571dd969f418797b2223f529f5110",
  });
  const handleCloseClick = () => {
    setOpenedModal(null);
  };
  async function onSearchClick() {
    try {
      const { q, sortBy, apiKey } = apiRequestData;
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const format = (d) => d.toISOString().split("T")[0];
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&from=${format(sevenDaysAgo)}&to=${format(today)}&sortBy=${sortBy}&apiKey=${apiKey}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data.articles[1]);
      setCardArray(data.articles);
    } catch (err) {
      console.error("Error", err);
    }
  }
  function handleLogout() {
    setIsLoggedIn(false);
  }
  return (
    <>
      <Main
        onSearchClick={onSearchClick}
        apiRequestData={apiRequestData}
        setApiRequestData={setApiRequestData}
      >
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          currentUser={currentUser}
          setOpenedModal={setOpenedModal}
        />
      </Main>
      <News cardArray={cardArray}></News>
      {/* <Preloader></Preloader> */}
      <LoginModal
        openedModal={openedModal}
        handleCloseClick={handleCloseClick}
        setOpenedModal={setOpenedModal}
      ></LoginModal>
      <RegisterModal
        openedModal={openedModal}
        handleCloseClick={handleCloseClick}
        setOpenedModal={setOpenedModal}
      ></RegisterModal>
      <About />
      <Footer />
    </>
  );
}

export default App;
