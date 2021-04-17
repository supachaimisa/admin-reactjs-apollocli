import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import ProductManage from './ProductManage';
import ProductInsert from './ProductInsert';
import ProductUpdate from './ProductUpdate';
const Product = () => {
    return (
        <div>
            <Route exact path="/product/manage">
                <ProductManage />
            </Route>
            <Route path="/product/insert">
                <ProductInsert />
            </Route>
            <Route path="/product/update:id">
                <ProductUpdate />
            </Route>
        </div>
    );
}

export default Product;
