import "./quantitypicker.css";
import { useState } from "react";

function QuantityPicker() {

        let [quantity, setQuantity] = useState(1);

    function increase (){
        console.log("button click");
        //quantity = 100; // Don't assign the value, we use the function setQuantity to determine this, so instead...
        //setQuantity(100);
        let val = quantity + 1;
        setQuantity(val);
    }

    function decrease (){
        if (quantity === 1) return;
        console.log("button click");
        let val = quantity - 1;
        setQuantity(val);
    }
    return (
        <div className="qt-picker">
            <button onClick={increase}> + </button>
            <label> {quantity} </label>
            <button disabled = {quantity === 1} onClick={decrease}> - </button>
        </div>
    );

}

export default QuantityPicker;