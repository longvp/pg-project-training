import { APIHost } from '../utils/constants'

enum APIService {
  auth,
  protected,
  public,
  api,
  apiAdmin,
  apiVendor,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/api/authentication`
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`
  } else if (service === APIService.public) {
    return `${APIHost}`
  } else if (service === APIService.api) {
    return `${APIHost}/api`
  } else if (service === APIService.apiAdmin) {
    return `${APIHost}/apiAdmin`
  } else if (service === APIService.apiVendor) {
    return `${APIHost}/apiVendor`
  }

  return ''
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  // userProfile: `${getBaseUrl(APIService.public)}/user`,
  countryList: `${getBaseUrl(APIService.apiAdmin)}/commons/country`,
  roleList: `${getBaseUrl(APIService.apiAdmin)}/commons/role`,
  userList: `${getBaseUrl(APIService.apiAdmin)}/users/list`,
  userDelete: `${getBaseUrl(APIService.apiAdmin)}/users/edit`,
  userCreate: `${getBaseUrl(APIService.apiAdmin)}/users/create`,
  userDetail: `${getBaseUrl(APIService.apiVendor)}/profile/detail`,
  userUpdate: `${getBaseUrl(APIService.apiAdmin)}/users/edit`,

  categoryList: `${getBaseUrl(APIService.api)}/categories/list`,
  brandList: `${getBaseUrl(APIService.apiAdmin)}/brands/list`,
  vendorList: `${getBaseUrl(APIService.apiAdmin)}/vendors/list`,
  productList: `${getBaseUrl(APIService.api)}/products/list`,
  productDelete: `${getBaseUrl(APIService.apiAdmin)}/products/edit`,
  productCreate: `${getBaseUrl(APIService.apiAdmin)}/products/create`,
  uploadImage: `${getBaseUrl(APIService.api)}/products/upload-image`,
}
