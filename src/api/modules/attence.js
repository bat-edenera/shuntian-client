import Request from "@/shared/utils/request";

class Attence {
  constructor() { }
  /**
   * 考勤列表
   * @param {{"startTime, endTime,pageSize,pageNum,orgIndexCode}} payload 
   */
  pagelist(payload) {
    return Request.post('/attendance/getList?_DEBUG_MODE_', payload)
  }
}

export const attence = new Attence();
