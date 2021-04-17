import React , {useState} from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import {
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CREATE_PRODUCT } from '../../GraphQL/mutation';
import { gql, useMutation } from '@apollo/client';
import swal from 'sweetalert';
const schema = yup.object().shape({
    product_title: yup.string().required(),
    product_price: yup.number().positive().integer().required(),
    product_rating: yup.number().positive().integer().required(),
    product_sale_finish: yup.number().positive().integer().required(),
    product_detail: yup.string().required(),
  });
const ProductInsert = () => {
    const [insertProduct, { data }] = useMutation(CREATE_PRODUCT);
    const { register , handleSubmit , formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    let history = useHistory()

    const formSumit = async (data) => {
        let d = new Date()
        // return
        let res = await insertProduct({ variables: { data: {...data , product_date : `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`} } })
        if(res){
            swal("Good job!", "You clicked the button!", "success")
            .then(() => {
                history.push("/product/manage")
            })
        }
        // return console.log(res);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(formSumit)}>
            <CRow>
                <CCol lg="12">
                <CCard>
                    <CCardHeader>
                    เพิ่มสินค้า [ Add Product ]
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="mb-3">
                            <CCol lg="6">
                                <label >ชื่อ [ Title ]</label>
                                <input 
                                type="text"
                                className="form-control"
                                // ref={register}
                                // name="product_title"
                                {...register("product_title")}
                                placeholder="ชื่อสินค้า..."  
                                required
                                />
                            </CCol>
                            <CCol lg="2">
                                <label >ราคา  [ Price ]</label>
                                <input 
                                type="number"
                                className="form-control"
                                // ref={register}
                                // name="product_price"
                                {...register("product_price")}
                                placeholder="1000..."  
                                required
                                />
                            </CCol>
                            <CCol lg="2">
                                <label >เรทการขาย [ Rating ]</label>
                                <input 
                                type="number"
                                className="form-control"
                                // ref={register}
                                // name="product_rating"
                                {...register("product_rating")}
                                placeholder="1-5..."  
                                min="1" 
                                max="5" 
                                required
                                />
                            </CCol>
                            <CCol lg="2">
                                <label >ขายได้เท่าไหร่ [ Sale Finish  ]</label>
                                <input 
                                type="number"
                                className="form-control"
                                {...register("product_sale_finish")}
                                // ref={register}
                                // name="product_sale_finish"
                                placeholder="1000..."  
                                min="0" 
                                required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol lg="6">
                                <label >รายละเอียด [ Details ]</label>
                                <textarea
                                    // ref={register}
                                    type="text"
                                    // name="product_detail"
                                    className="form-control"
                                    {...register("product_detail")}
                                    rows="3"
                                    placeholder="Detail..." 
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol lg="12" align="right">
                            <CButton type="submit" className="mb-3" color="secondary" >ยกเลิก</CButton>
                            &nbsp;
                            <CButton type="submit" className="mb-3" color="success" >บันทึก</CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>
            </form>
        </div>
    );
}

export default ProductInsert;
