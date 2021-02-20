import Request from "@/shared/utils/request";

class Invoice {
  constructor() { }
  upload(payload) {
    return Request.post('/invoice/upload', payload, { contentType: 'application/x-www-form-urlencoded' })
  }
}

export const invoice = new Invoice();
