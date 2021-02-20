import Request from "@/shared/utils/request";
import qs from "qs";

class Account {
  constructor() { }
  /**
   * 登录
   * @param {{username, password}} payload 
   */
  login(payload) {
    // return Request.post("/Token", qs.stringify(payload), {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ token_type: 'Bear', access_token: '12345678abc' })
      }, 100)
    })
  }
  logout() {
    // return Request.post("/Authorize/Logout");
    return { code: 200 }
  }
  getUserInfo() {
    // return Request.get('/Authorize/GetCurrentUser')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ name: 'admin', mobile: '18153252213' })
      }, 1000)
    })
  }
  getUserListByKey(name) {
    return Request.post('/person/getList?_DEBUG_MODE_', { name })
  }

}

export const account = new Account();
