import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Catalog from './pages/catalog';
import QuantityPicker from './components/quantitypicker';
import Product from './components/product';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      < QuantityPicker />
      <div className="container-fluid">
        < Catalog />
        < Product />
      </div> 

    
      <Footer />
    </div>
  );
}

export default App;
