import React from 'react';
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CInput,
    CRow
  } from '@coreui/react'
  import {
    Link,
    useParams,
  } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { useHistory } from "react-router-dom";
import usersData from '../users/UsersData'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../../GraphQL/query';
import { DELETE_PRODUCT } from '../../GraphQL/mutation';
import swal from 'sweetalert';

const fields = [
    {key: 'product_title' , label: 'ชื่อสินค้า [หัวข้อ]'},
    {key: 'product_date' , label: 'วันที่อัพเดตสินค้า'},
    {key: 'product_price' , label: 'ราคา'},
    {key: 'product_rating' , label: 'Rating'},
    {key: 'action' , label: 'Action'},
]
const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
const ProductManage = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [deleteProducts, { data: deleteProductdd }] = useMutation(DELETE_PRODUCT);
      
    
    if (loading) return <p>Loading ...</p>;
      if (error) return <p>error ...</p>;
      console.log(data);
      const deleteProduct = async (id) => {
        let res = await deleteProducts({ variables: { id: parseInt(id) } })
        if(res){
            swal("Good job!", "You clicked the button!", "success")
            .then(() => {
                history.push("/product/manage")
            })
        }
    }
    const eachStar = (count) => {
        switch (count) {
            case 1:
                return <CIcon name="cil-star" className="mfe-2" />
            case 2:
                return (
                <>
                <CIcon name="cil-star" className="mfe-2" />
                <CIcon name="cil-star" className="mfe-2" />
                </>
                )
            case 3:
                return (
                    <>
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    </>
                    )
            case 4:
                return (
                    <>
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    </>
                    )
        
            default:
                return (
                    <>
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    <CIcon name="cil-star" className="mfe-2" />
                    
                    </>
                    )
        }
        
    } 
    
    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                <CCard>
                    <CCardHeader>
                    จัดการสินค้า [ Product Management ]
                    </CCardHeader>
                    <CCardBody>
                    
                    <CRow>
                    <CCol lg="3">
                    <CInput
                            type="text"
                            id="serach"
                            name="serach"
                            placeholder="คำค้นหา..."
                        />
                    </CCol>
                    <CCol lg="3">
                    </CCol>
                    <CCol lg="3">
                    </CCol>
                    <CCol lg="3" align="right">
                        <CButton onClick={() => history.push('/product/insert')} className="mb-3" color="success" >เพิ่มสินค้า [ Add Product ]</CButton>
                    </CCol>
                    </CRow>
                
                    
                    <CDataTable
                    items={data.getProducts}
                    fields={fields}
                    itemsPerPage={10}
                    pagination
                    scopedSlots = {{
                        'product_rating':
                        (item)=>(
                            <>
                            <td style={{ color: "#FF8429" }}>
                                {eachStar(item.product_rating)}
                            </td>
                            </>
                        ),
                        'product_price': 
                        (item)=>(
                            <td>
                                {item.product_price + ' บาท'}
                            </td>
                        ),
                        'action': 
                        (item)=>(
                            <td align="center">
                                <Link to={`/product/update${item.id}`} color="warning" >
                                    <CButton className="mb-3" color="warning">
                                        <CIcon name="cil-file"/>
                                    </CButton>
                                </Link>
                                &nbsp;
                            <CButton onClick={() => deleteProduct(item.id)} className="mb-3" color="danger"><CIcon name="cil-x"/></CButton>
                            </td>
                        )
                    }}
                    />
                    
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>
        </div>
    );
}

export default ProductManage;
