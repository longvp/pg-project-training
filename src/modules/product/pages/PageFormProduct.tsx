import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IProductCreate } from '../../../models/product'
import { AppState } from '../../../redux/reducer'
import { Action } from 'redux'
import BackPage from '../../common/components/backPage/BackPage'
import FormProduct from '../components/formProduct/FormProduct'
import { fetchThunk } from '../../common/redux/thunk'
import { API_PATHS } from '../../../configs/api'
import { setBrandList, setCategoryList, setShippingsAPI } from '../redux/productReducer'
import { setCountryList } from '../../user/redux/userReducer'
import { toast } from 'react-toastify'
import Loading from '../../common/components/loading/Loading'
import { useHistory, useParams } from 'react-router'
import { STATUS_ACTION } from '../utils'
import { ROUTES } from '../../../configs/routes'
import { dateFormat } from '../../../utils'
import { IShippingZone } from '../../../models/shippingZone'

const PageFormProduct = () => {
  // ---------------------------- CREATE PRODUCT ------------------------------------
  // --------------------------------------------------------------------------------
  // (vendor, images, description, shipping - value ko trong formik)
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const history = useHistory()
  // ------------ VENDOR -----------
  const [idVendor, setIdVendor] = React.useState<string | number>('')
  const [messValidVendor, setMessValidVendor] = React.useState<string>('')
  React.useEffect(() => {
    if (!idVendor) {
      setMessValidVendor('Vendor is not found')
      return
    }
    if (isNaN(+idVendor)) {
      setMessValidVendor('Vendor is not found')
    } else {
      setMessValidVendor('')
    }
  }, [idVendor])
  // ------------ DESCRIPTION -----------
  const [description, setDescription] = React.useState<string>('')
  const [messValidDescription, setMessValidDescription] = React.useState<string>('')
  React.useEffect(() => {
    if (!description) {
      setMessValidDescription('Description is required')
    } else {
      setMessValidDescription('')
    }
  }, [description])

  // ------------- IMAGES ORDER ---------
  const [imagesOrder, setImagesOrder] = React.useState<string[]>([])
  const [imagesFile, setImagesFile] = React.useState<any[]>([])
  const [messValidImage, setMessValidImage] = React.useState<string>('')

  React.useEffect(() => {
    if (imagesOrder.length > 0) {
      setMessValidImage('')
    } else {
      setMessValidImage('Image is required')
    }
  }, [imagesOrder])

  // ------------- SHIPPING ZONE ---------
  const [shippingZone, setShippingZone] = React.useState<IShippingZone[]>([])

  // ------------- GET BRAND LIST -------
  const getBrandList = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.brandList, 'get'))
    if (json?.success) {
      dispatch(setBrandList(json.data))
    }
    setLoading(false)
  }, [])

  // ------------- GET CATEGORY LIST ----
  const getCategoryList = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.categoryList, 'get'))
    if (json?.success) {
      dispatch(setCategoryList(json.data))
    }
    setLoading(false)
  }, [])

  // ------------- GET COUNTRY LIST -----
  const getCountryList = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.countryList, 'get'))
    if (json?.success) {
      dispatch(setCountryList(json.data))
    }
    setLoading(false)
  }, [])

  // ------------- GET SHIPPING API LIST -----
  const getShippingList = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.shippingList, 'get'))
    if (json?.success) {
      dispatch(setShippingsAPI(json.data))
    }
    setLoading(false)
  }, [])

  React.useEffect(() => {
    getBrandList()
    getCategoryList()
    getCountryList()
    getShippingList()
  }, [])

  // ---------------------------- DETAIL PRODUCT ------------------------------------
  // --------------------------------------------------------------------------------
  const param = useParams<{ productId: string | undefined }>()
  const productId = param.productId || ''

  const [productDetail, setProductDetail] = React.useState<IProductCreate>({
    vendor_id: '',
    name: '',
    brand_id: '', //
    condition_id: '',
    inventory_tracking: 0, //0
    sku: '',
    categories: [], //
    description: '',
    enabled: false,
    // ----- PRICES AND INVENTORY -------
    memberships: [],
    tax_exempt: false,
    price: '',
    participate_sale: false,
    sale_price_type: '',
    sale_price: '',
    arrival_date: '', //'2022-07-05'//
    quantity: '',
    // ----- SHIPPING -------
    shipping_to_zones: [],
    // ----- MARKETING -------
    og_tags_type: '',
    og_tags: '',
    meta_desc_type: '',
    meta_description: '',
    meta_keywords: '',
    product_page_title: '',
    facebook_marketing_enabled: false,
    google_feed_enabled: false,
    // DETAIL PRODUCT
    cleanURL: '',
    code: '',
    id: '',
    images: [],
    sort_description: '',
    weight: '',
  })

  const [nameVendor, setNameVendor] = React.useState<string>('')
  const [deletedImages, setDeletedImages] = React.useState<number[]>([])
  const [statusAction, setStatusAction] = React.useState<string>(STATUS_ACTION.CREATE)

  // GET VENDOR TO SET NAME
  const getVendorById = React.useCallback(async (id) => {
    setLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.userDetail, 'post', {
        id,
      }),
    )
    if (json?.success) {
      setNameVendor(`${json?.data?.info?.companyName || ''}${json?.data?.info?.email || ''}`)
    }
    setLoading(false)
  }, [])

  const getProductDetail = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.productDetail, 'post', {
        id: productId,
      }),
    )
    if (json?.success) {
      const data = json?.data
      if (data?.vendor_id) {
        getVendorById(data?.vendor_id)
        setIdVendor(data?.vendor_id)
      }
      setDescription(data?.description)
      setProductDetail(data)
    } else {
      toast.error(`${productId} is not a number`)
    }
    setLoading(false)
  }, [productId])

  React.useEffect(() => {
    if (productId) {
      setStatusAction(STATUS_ACTION.UPDATE)
      getProductDetail()
    }
  }, [productId])

  // -------- ACTION CREATE - UPDATE --------------
  const handleCreate = React.useCallback(
    async (values: IProductCreate) => {
      if (idVendor === '' || description === '' || messValidImage !== '') {
        return
      }
      setLoading(true)
      const postValues = {
        ...values,
        vendor_id: idVendor,
        description,
        enabled: +values.enabled,
        arrival_date: dateFormat(values.arrival_date), //new Date(values.arrival_date).getTime(),
        tax_exempt: +values.tax_exempt,
        price: +values.price.toString().replaceAll(',', ''),
        participate_sale: +values.participate_sale,
        sale_price: +values.sale_price.toString().replaceAll(',', ''),
        facebook_marketing_enabled: +values.facebook_marketing_enabled,
        google_feed_enabled: +values.google_feed_enabled,
        imagesOrder,
        deleted_images: deletedImages,
        shipping_to_zones: shippingZone.map((s) => ({ id: s.id, price: s.price })),
      }
      const formData = new FormData()
      formData.append('productDetail', JSON.stringify(postValues))
      const json = await dispatch(fetchThunk(API_PATHS.productCreate, 'post', formData, true, 'multipart/form-data'))
      // ------------- UPLOAD IMAGE -----------------
      if (json?.success) {
        if (imagesOrder.length > 0) {
          const formDataImage = new FormData()
          formDataImage.append('productId', json?.data)
          for (let i = 0; i < imagesFile.length; i++) {
            formDataImage.append('order', `${i}`)
            formDataImage.append('images[]', imagesFile[i])
            await dispatch(fetchThunk(API_PATHS.uploadImage, 'post', formDataImage, true, 'multipart/form-data'))
            formDataImage.delete('order')
            formDataImage.delete('images[]')
          }
        }
        toast.success(`${statusAction === STATUS_ACTION.UPDATE ? 'Update' : 'Create'} product success`)
        history.push(ROUTES.manageProduct)
      } else {
        toast.error(json.errors)
      }
      setLoading(false)
    },
    [idVendor, description, messValidImage, imagesOrder, shippingZone],
  )

  return (
    <>
      <div className="page">
        <BackPage />
        <div className="title">
          {productDetail?.name || 'Create Product'}
          <hr />
        </div>
        <FormProduct
          handleCreate={handleCreate}
          loading={loading}
          setIdVendor={setIdVendor}
          messValidVendor={messValidVendor}
          setDescription={setDescription}
          description={description}
          messValidDescription={messValidDescription}
          setImagesOrder={setImagesOrder}
          setImagesFile={setImagesFile}
          messValidImage={messValidImage}
          productDetail={productDetail}
          nameVendor={nameVendor}
          setDeletedImages={setDeletedImages}
          statusAction={statusAction}
          setShippingZone={setShippingZone}
        />
      </div>
      {loading && <Loading />}
    </>
  )
}

export default PageFormProduct
