import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IProductCreate } from '../../../../models/product'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import BackPage from '../../../home/components/backPage/BackPage'
import FormCreateProduct from './../../components/formCreateProduct/FormCreateProduct'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { setBrandList, setCategoryList } from '../../redux/productReducer'
import { setCountryList } from '../../../user/redux/userReducer'
import { toast } from 'react-toastify'
import Loading from '../../../home/components/loading/Loading'

const PageCreateProduct = () => {
  // const param = useParams<{ productId: string | undefined }>()
  // const productId = param.productId || ''

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = React.useState<boolean>(false)

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
    if (imagesOrder.length === 0) {
      //&& imageUrls.length < 0
      setMessValidImage('Image is required')
    }
    if (imagesOrder.length > 0) {
      //|| imageUrls.length > 0
      setMessValidImage('')
    }
  }, [imagesOrder]) //imageUrls

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

  React.useEffect(() => {
    getBrandList()
    getCategoryList()
    getCountryList()
  }, [])

  const handleCreate = React.useCallback(
    async (values: IProductCreate) => {
      setLoading(true)
      const postValues = {
        ...values, // convert categories[], mememberships[] to number
        vendor_id: idVendor,
        description,
        enabled: +values.enabled,
        arrival_date: new Date(values.arrival_date).getTime(),
        tax_exempt: +values.tax_exempt,
        participate_sale: +values.participate_sale,
        facebook_marketing_enabled: +values.facebook_marketing_enabled,
        google_feed_enabled: +values.google_feed_enabled,
        imagesOrder,
      }
      const formData = new FormData()
      formData.append('productDetail', JSON.stringify(postValues))
      const json = await dispatch(fetchThunk(API_PATHS.productCreate, 'post', formData, true, 'multipart/form-data'))
      if (json?.success) {
        const formDataImage = new FormData()
        for (let i = 0; i < imagesFile.length; i++) {
          formDataImage.append('productId', json?.data)
          formDataImage.append('order', JSON.stringify(i))
          formDataImage.append('images[]', imagesFile[i])
        }
        const jsonImage = await dispatch(
          fetchThunk(API_PATHS.uploadImage, 'post', formDataImage, true, 'multipart/form-data'),
        )
        if (jsonImage?.success) {
          toast.success('Create product success')
        } else {
          toast.error(jsonImage.errors)
        }
      } else {
        toast.error(json.errors)
      }
      setLoading(false)
    },
    [idVendor, description, imagesOrder],
  )

  return (
    <>
      <div className="page">
        <BackPage />
        <div className="title">Create Product</div>
        <FormCreateProduct
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
        />
      </div>
      {loading && <Loading />}
    </>
  )
}

export default PageCreateProduct
