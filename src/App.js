import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";
import Hero from "./components/Hero";
import Products from "./components/Products";
import { productData } from "./components/Products/data";
import { productDataTwo } from "./components/Menu/data";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} className="App">
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route
          exact
          path="/orders"
          element={<Products heading="Today's Orders" data={productData} />}
        />
        <Route exact path="/" element={<Feature />} />
        <Route
          exact
          path="/menu"
          element={<Menu heading="Menu" data={productDataTwo} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
