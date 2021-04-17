import { gql } from '@apollo/client';
export const GET_PRODUCT_BY_CODE = gql`
query getProduct($id: Float!){
  	getProduct(id : $id){
      id
      product_title
      product_date
      product_price
      product_rating
      product_sale_finish
      product_detail
    }
  }
`;
export const GET_PRODUCTS = gql`
query{ 
    getProducts{
      id
      product_title
      product_date
      product_price
      product_rating
      product_sale_finish
      product_detail
    }
}
`;