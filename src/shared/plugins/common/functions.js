
export function flatmap(arr) {
  return arr.reduce((map, cur) => {
    if (cur.children && cur.children.length > 0) {
      map = map.concat(flatmap(cur.children));
    }
    return map.concat(cur);
  }, []);
}
export function wait(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, s)
  })
}
