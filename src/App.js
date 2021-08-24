import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// PAGE
import HomePage from "./pages/HomePage";

// COMPONENTS
import AlertMsg from "./components/AlertMsg";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="app">
      <AlertMsg />
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
