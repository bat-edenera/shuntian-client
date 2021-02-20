import Request from "@/shared/utils/request";

class Contract {
  constructor() { }
  /**
   * 考勤列表
   * @param {{"startTime, endTime,pageSize,pageNum,orgIndexCode}} payload 
   */
  pagelist(payload) {
    return Request.get('/contract')
  }
}

export const contract = new Contract();
