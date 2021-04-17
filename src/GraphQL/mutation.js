import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
mutation createProduct($data: ProductInput!){
  createProduct(data : $data){
    id
    product_title
  }
}
`
export const UPDATE_PRODUCT = gql`
mutation updateProduct($id:Float! ,$data:ProductInput! ){
  updateProduct(id: $id , data : $data ){
    id
    product_title
  }
}
`

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id:Float!){
  deleteProduct(id: $id ){
    id
    product_title
  }
}
`