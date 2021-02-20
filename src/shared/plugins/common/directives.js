import store from "@/shared/store";
export const permission = {
  inserted(el, { value }) {
    let anyArr = value.split("||");
    let allArr = value.split("&&");
    if (anyArr.length > 1) {
      store.getters.isAnyGranted(anyArr) || el.parentNode.removeChild(el);
    } else if (allArr.length > 1) {
      store.getters.isAllGranted(allArr) || el.parentNode.removeChild(el);
    } else {
      let _val = anyArr[0];
      (_val && store.getters.isGranted(_val)) || el.parentNode.removeChild(el);
    }
  },
};
