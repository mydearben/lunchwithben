import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Admin from "./components/Admin";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} className="App">
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route
          exact
          path="/orders"
          element={<Products heading="Today's Orders" />}
        />
        <Route exact path="/menu" element={<Menu heading="Menu" />} />
        <Route exact path="/admin" element={<Admin heading="Admin" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
