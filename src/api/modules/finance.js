import Request from "@/shared/utils/request";

class Finance {
  constructor() { }
  /**
   * 消费列表
   * @param {*} payload 
   */
  pagelist(payload) {
    return Request.post('/account/getList?_DEBUG_MODE_', payload)
  }
  export(payload) {
    return Request.post('/account/Export?_DEBUG_MODE_', payload, { responseType: 'blob' })
  }

}

export const finance = new Finance();
