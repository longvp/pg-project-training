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
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  // register: `${getBaseUrl(APIService.auth)}/register`,
  // getLocation: `${getBaseUrl(APIService.public)}/location`,
}
