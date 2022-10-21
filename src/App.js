import { useState } from "react";
import Header from "./components/Layout/Header/Header";
import UsersList from "./components/Users/UsersList";
import UsersProvider from "./store/UsersProvider";
import UserForm from "./components/Users/UserForm";

function App() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    console.log("entered");
    setModalIsShown(false);
  };

  return (
    <UsersProvider>
      <Header />
      <main>
        {modalIsShown && <UserForm onClose={hideModalHandler} />}
        <UsersList onShowModal={showModalHandler} onClose={hideModalHandler} />
      </main>
    </UsersProvider>
  );
}

export default App;
