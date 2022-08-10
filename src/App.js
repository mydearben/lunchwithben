import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";
import Hero from "./components/Hero";
import Products from "./components/Products";
import { productData, productDataTwo } from "./components/Products/data";
import Feature from "./components/Feature";
import Footer from "./components/Footer";

function App() {
  return (
    <Router className="App">
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
          path="/"
          element={
            <Products heading="Sweet treats for you" data={productDataTwo} />
          }
        />
      </Routes>
      <Footer />
    </Router>
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
