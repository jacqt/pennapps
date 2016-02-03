
export function getUserFromData(data) {
  return Object.assign(data.society, {
    items: data.items
  })
}
