import Request from "@/shared/utils/request";

class Contract {
  constructor() { }
  pagelist(payload) {
    return Request.get('/contract')
  }
  check(id) {
    return Request.get('/invoice/check/' + id)
  }
  upload(payload) {
    return Request.post('/contract/upload', payload, { contentType: 'application/x-www-form-urlencoded' })
  }
}

export const contract = new Contract();
