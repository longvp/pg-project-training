import { Field, Form, Formik } from 'formik'
import React from 'react'
import { IProductCreate } from '../../../../models/product'
import Footer from '../../../defaultLayout/footer/Footer'
import VendorField from '../vendorField/VendorField'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/reducer'
import CustomSelectFormik from '../../../common/components/customSelectFormik/CustomSelectFormik'
import { IOption } from '../../../../models/option'
import { IBrand } from '../../../../models/brand'
import {
  CONDITION_OPTIONS,
  MEMBERSHIP_OPTIONS,
  META_DESC_TYPE_OPTIONS,
  OG_TAGS_TYPE_OPTIONS,
  SALE_PRICE_TYPE_OPTIONS,
  STATUS_ACTION,
} from '../../utils'
import { ICategory } from '../../../../models/category'
import JoditEditor from 'jodit-react'
import UploadImage from './uploadImage/UploadImage'
import moment from 'moment'
import FormInput from '../../../common/components/formInput/FormInput'
import { NavLink } from 'react-router-dom'
import Shipping from './shipping/ShippingList'
import { formatCurrency } from './../../../../utils/index'
import { IShippingZone } from '../../../../models/shipping'

interface Props {
  loading: boolean
  handleCreate(values: IProductCreate): void
  setIdVendor(idVendor: string | number): void
  messValidVendor: string
  description: string
  setDescription(description: string): void
  messValidDescription: string
  setImagesOrder(imagesOrder: string[]): void
  setImagesFile(imagesFile: File[]): void
  messValidImage: string
  productDetail: IProductCreate
  nameVendor: string
  setDeletedImages(arrIDImageDeleted: number[]): void
  statusAction: string
  setShippingZone(list: IShippingZone[]): void
}

const FormProduct = (props: Props) => {
  const {
    handleCreate,
    loading,
    setIdVendor,
    messValidVendor,
    description,
    setDescription,
    messValidDescription,
    setImagesOrder,
    setImagesFile,
    messValidImage,
    productDetail,
    nameVendor,
    setDeletedImages,
    statusAction,
    setShippingZone,
  } = props

  const { brandList, categoryList } = useSelector((state: AppState) => ({
    brandList: state.product.brandList,
    categoryList: state.product.categoryList,
  }))

  const [initialValues, setInitialValues] = React.useState<IProductCreate>({
    vendor_id: '',
    name: '',
    brand_id: '',
    condition_id: '',
    inventory_tracking: 0,
    sku: '' + new Date().getTime(),
    imagesOrder: [],
    categories: [],
    description: '',
    enabled: false,

    memberships: [],
    tax_exempt: false,
    price: formatCurrency(1),
    participate_sale: false,
    sale_price_type: SALE_PRICE_TYPE_OPTIONS[0].value,
    sale_price: formatCurrency(0),
    arrival_date: '' + moment(Date.now()).format('YYYY-MM-DD'),
    quantity: 1,

    shipping_to_zones: [
      {
        id: 1,
        price: 0,
      },
    ],

    og_tags_type: OG_TAGS_TYPE_OPTIONS[0].value,
    og_tags: '',
    meta_desc_type: META_DESC_TYPE_OPTIONS[0].value,
    meta_description: '',
    meta_keywords: '',
    product_page_title: '',
    facebook_marketing_enabled: false,
    google_feed_enabled: false,

    deleted_images: [],
  })

  React.useEffect(() => {
    if (productDetail.id) {
      let categoriesDetail: any[] = []
      let membershipsDetail: any[] = []
      if (productDetail.categories && productDetail.categories.length > 0) {
        categoriesDetail = productDetail.categories.map((c) => c.category_id)
      }
      if (productDetail.memberships && productDetail.memberships.length > 0) {
        membershipsDetail = productDetail.memberships.map((m) => m.membership_id)
      }
      setInitialValues({
        ...productDetail,
        inventory_tracking: productDetail.inventory_tracking,
        enabled: Boolean(+productDetail.enabled),
        tax_exempt: Boolean(+productDetail.tax_exempt),
        price: formatCurrency(+productDetail.price.toString().replaceAll(',', '')), //+Number(productDetail.price).toFixed(2),
        participate_sale: Boolean(+productDetail.participate_sale),
        sale_price: formatCurrency(+productDetail.sale_price.toString().replaceAll(',', '')), //+Number(productDetail.sale_price).toFixed(2)
        arrival_date: moment(+productDetail.arrival_date * 1000).format('YYYY-MM-DD'),
        facebook_marketing_enabled: Boolean(+productDetail.facebook_marketing_enabled),
        google_feed_enabled: Boolean(+productDetail.google_feed_enabled),
        categories: categoriesDetail,
        memberships: membershipsDetail,
      })
    }
  }, [productDetail])

  const validationSchema = yup.object({
    name: yup.string().required('Title is required'),
    brand_id: yup.string().required('Brand is required'),
    sku: yup.string().required('Sku is required'),
    condition_id: yup.string().required('Condition is required'),
    categories: yup.array().min(1, 'Categories is required'),
    price: yup.string().required('Price is required'),
    quantity: yup.string().required('Quantity is required'),
  })

  // ----------- CHANGE VENDOR ----------
  const handleChangeVendor = (idVendor: string | number) => {
    setIdVendor(idVendor)
  }

  //-------- BUILD BRAND OPTION ---------
  const [brandOptions, setBrandOptions] = React.useState<IOption[]>([])

  const buildBrandOptions = (brandList: IBrand[]) => {
    brandList.shift()
    const result: IOption[] = []
    if (brandList && brandList.length > 0) {
      brandList.map((b) => {
        result.push({ label: b.name, value: '' + b.id })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (brandList && brandList.length > 0) {
      setBrandOptions(buildBrandOptions(brandList))
    }
  }, [brandList])

  //-------- BUILD CATEGORY OPTION ---------
  const [categoryOptions, setCategoryOptions] = React.useState<IOption[]>([])

  const buildCategoryOptions = (categoryList: ICategory[]) => {
    const result: IOption[] = []
    if (categoryList && categoryList.length > 0) {
      categoryList.map((c) => {
        result.push({ label: c.name, value: '' + c.id })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      setCategoryOptions(buildCategoryOptions(categoryList))
    }
  }, [categoryList])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data) => {
          handleCreate(data)
        }}
      >
        {({ values, errors, touched }) => (
          <>
            {values.og_tags_type == 1 ? values.og_tags : (values.og_tags = '')}
            {values.meta_desc_type === 'C' ? values.meta_description : (values.meta_description = '')}
            {/* {(values.price = formatCurrency(+values.price.toString().replaceAll(',', '')))} */}
            {/* {(values.sale_price = formatCurrency(+values.sale_price.toString().replaceAll(',', '')))} */}
            <Form>
              <FormInput isRequired label="Vendor">
                <>
                  {/* nameVendor="nameadg" */}
                  <VendorField handleChangeVendor={handleChangeVendor} nameVendor={nameVendor} />
                  {messValidVendor && <small className="text-danger">{messValidVendor}</small>}
                </>
              </FormInput>
              {/* PRODUCT TITLE */}
              <FormInput isRequired htmlFor="name" label="Product Title">
                <>
                  <Field type="text" id="name" name="name" className="input-field" />
                  {errors && errors?.name && touched?.name && <small className="text-danger">{errors?.name}</small>}
                </>
              </FormInput>
              {/* BRAND */}
              <FormInput isRequired label="Brand">
                <>
                  <Field
                    placeholder="Select brand"
                    name="brand_id"
                    options={brandOptions}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                  {errors && errors?.brand_id && touched?.brand_id && (
                    <small className="text-danger">{errors?.brand_id}</small>
                  )}
                </>
              </FormInput>
              {/* CONDITION */}
              <FormInput isRequired label="Condition">
                <>
                  <Field
                    placeholder="Select condition"
                    name="condition_id"
                    options={CONDITION_OPTIONS}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                  {errors && errors?.condition_id && touched?.condition_id && (
                    <small className="text-danger">{errors?.condition_id}</small>
                  )}
                </>
              </FormInput>
              {/* SKU */}
              <FormInput isRequired label="Sku" htmlFor="sku">
                <>
                  <Field type="text" id="sku" name="sku" className="input-field" />
                  {errors && errors?.sku && touched?.sku && <small className="text-danger">{errors?.sku}</small>}
                </>
              </FormInput>
              {/* IMAGES */}
              <FormInput isRequired label="Images">
                <>
                  <UploadImage
                    setImagesOrder={setImagesOrder}
                    setImagesFile={setImagesFile}
                    productDetail={productDetail}
                    setDeletedImages={setDeletedImages}
                  />
                  {messValidImage && <small className="text-danger">{messValidImage}</small>}
                </>
              </FormInput>
              {/* CATEGORIES */}
              <FormInput isRequired label="Categories">
                <>
                  <Field
                    placeholder="Select categories"
                    name="categories"
                    options={categoryOptions}
                    component={CustomSelectFormik}
                    isMulti={true}
                  />
                  {errors && errors?.categories && touched?.categories && (
                    <small className="text-danger">{errors?.categories}</small>
                  )}
                </>
              </FormInput>
              {/* DESCRIPTION */}
              <FormInput isRequired label="Description">
                <>
                  <JoditEditor value={description} onChange={(content) => setDescription(content)} />
                  {messValidDescription && <small className="text-danger">{messValidDescription}</small>}
                </>
              </FormInput>
              {/* AVALILABLE FOR SALE */}
              <FormInput label="Available for sale" htmlFor="enabled">
                <>
                  <Field type="checkbox" id="enabled" className="switch-input" name="enabled" />
                  <label htmlFor="enabled" className="switch"></label>
                </>
              </FormInput>
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Prices & Inventory</h4>
              {/* MEMEBERSHIP */}
              <FormInput label="Memberships">
                <Field
                  placeholder="Select membership"
                  name="memberships"
                  options={MEMBERSHIP_OPTIONS}
                  component={CustomSelectFormik}
                  isMulti={true}
                />
              </FormInput>
              {/* Tax exempt */}
              <FormInput htmlFor="tax_exempt" label="Tax exempt">
                <Field type="checkbox" id="tax_exempt" name="tax_exempt" />
              </FormInput>
              {/* PRICE */}
              <FormInput isRequired htmlFor="price" label="Price ($)">
                <>
                  <Field
                    type="text"
                    id="price"
                    name="price"
                    className="input-field"
                    placeholder="$"
                    onKeyPress={(e: any) => {
                      if (!e.code.includes('Digit')) {
                        e.preventDefault()
                      } else {
                        return e
                      }
                    }}
                  />
                  {errors && errors?.price && touched?.price && <small className="text-danger">{errors?.price}</small>}
                </>
              </FormInput>
              {/* SALE */}
              <FormInput htmlFor="participate_sale" label="Sale">
                <Field type="checkbox" id="participate_sale" name="participate_sale" />
              </FormInput>
              {/* SALE PRICE TYPE */}
              {values.participate_sale && (
                <>
                  <FormInput label="Sale price type">
                    <Field
                      placeholder="Select price type"
                      name="sale_price_type"
                      options={SALE_PRICE_TYPE_OPTIONS}
                      component={CustomSelectFormik}
                    />
                  </FormInput>
                  {/* PRICE SALE */}
                  <FormInput label="Sale price ($)" htmlFor="sale_price">
                    <Field
                      type="text"
                      id="sale_price"
                      name="sale_price"
                      className="input-field"
                      placeholder="$"
                      onKeyPress={(e: any) => {
                        if (!e.code.includes('Digit')) {
                          e.preventDefault()
                        } else {
                          return e
                        }
                      }}
                    />
                  </FormInput>
                </>
              )}
              {/* ARRIVAL DATE */}
              <FormInput label="Arrival Date" htmlFor="arrival_date">
                <Field type="date" id="arrival_date" name="arrival_date" className="input-field" />
              </FormInput>
              {/*   QUANTITY */}
              <FormInput isRequired label="Quantity in stock" htmlFor="quantity">
                <>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="input-field"
                    min="1"
                    onKeyPress={(e: any) => {
                      if (!e.code.includes('Digit')) {
                        e.preventDefault()
                      } else {
                        return e
                      }
                    }}
                  />
                  {errors && errors?.quantity && touched?.quantity && (
                    <small className="text-danger">{errors?.quantity}</small>
                  )}
                </>
              </FormInput>
              <div className="seprated-space"></div>
              {/* SHIPPING */}
              <h4 className="title-sub my-3">Shipping</h4>
              <Shipping setShippingZone={setShippingZone} productDetail={productDetail} />
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Marketing</h4>
              {/* Open Graph meta tags */}
              <FormInput label="Open Graph meta tags">
                <Field
                  placeholder="Select meta tags"
                  name="og_tags_type"
                  options={OG_TAGS_TYPE_OPTIONS}
                  component={CustomSelectFormik}
                  isMulti={false}
                />
              </FormInput>
              {values.og_tags_type == 1 && (
                <FormInput>
                  <Field as="textarea" id="og_tags" name="og_tags" className="input-field" />
                </FormInput>
              )}
              {/* META DESCRIPTION */}
              <FormInput label="Meta description">
                <Field
                  placeholder="Select meta desc"
                  name="meta_desc_type"
                  options={META_DESC_TYPE_OPTIONS}
                  component={CustomSelectFormik}
                  isMulti={false}
                />
              </FormInput>
              {values.meta_desc_type === 'C' && (
                <FormInput>
                  <Field as="textarea" id="meta_description" name="meta_description" className="input-field" />
                </FormInput>
              )}
              {/* META KEYWORD */}
              <FormInput label="Meta keywords" htmlFor="meta_keywords">
                <Field type="text" id="meta_keywords" name="meta_keywords" className="input-field" />
              </FormInput>
              {/* PRODUCT PAGE DETAIL*/}
              <FormInput label="Product page detail" htmlFor="product_page_title">
                <Field type="text" id="product_page_title" name="product_page_title" className="input-field" />
              </FormInput>
              {/* Facebook product feed */}
              <FormInput label="Add to Facebook product feed" htmlFor="facebook_marketing_enabled">
                <>
                  <Field
                    type="checkbox"
                    id="facebook_marketing_enabled"
                    className="switch-input"
                    name="facebook_marketing_enabled"
                  />
                  <label htmlFor="facebook_marketing_enabled" className="switch"></label>
                </>
              </FormInput>
              {/*  Google product feed */}
              <FormInput label="Add to Google product feed" htmlFor="google_feed_enabled">
                <>
                  <Field type="checkbox" id="google_feed_enabled" className="switch-input" name="google_feed_enabled" />
                  <label htmlFor="google_feed_enabled" className="switch"></label>
                </>
              </FormInput>
              <Footer>
                <>
                  <button type="submit" className="btn-footer" disabled={loading}>
                    {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                    {statusAction === STATUS_ACTION.UPDATE ? 'Update User' : 'Create User'}
                  </button>
                  {statusAction === STATUS_ACTION.UPDATE && <NavLink to="">{productDetail?.cleanURL}</NavLink>}
                </>
              </Footer>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default FormProduct
