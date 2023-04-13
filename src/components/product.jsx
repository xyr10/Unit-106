import "./product.css";
import QuantityPicker from './quantitypicker';

function Product() {
    return(
        <div className="product">

            <img src="https://picsum.photos/200/120" alt="picsum" />
            <h5>Title goes here</h5>

            <div className="prices">
                <label>Total</label>
                <label>Price</label>
            </div>
            < QuantityPicker />
            <button>Add</button>
            <button>Delete</button>


        </div>
    );

}

export default Product;

//Render the product in the Catalog 5 times
//Render the price and the total from each product