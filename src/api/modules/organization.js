import Request from "@/shared/utils/request";

class Organization {
  constructor() { }
  /**
   * 组织结构
   * @param {*} payload 
   */
  getTree() {
    return Request.post('/org/getList?_DEBUG_MODE_')
  }
}

export const organization = new Organization();
