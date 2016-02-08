
export function getUserFromData(data) {
  return Object.assign(data.society, {
    items: data.items
  })
}

/* rails returns error of the form
   {"name": ["can't be blank"],
    "year_end": ["can't be blank"],
    "date_of_incorporation": ["can't be blank"]
   }
*/
export function railsErrorsToString(errors) {
  if (!errors) return
  let key = Object.keys(errors)[0]
  const value = errors[key]
  const map = {
    name: 'Name',
    email: 'E-mail',
    nickname: 'URL Name',
    sort_code: 'Sort code',
    account_number: 'Account number',
  }
  if (key in map) {
    key = map[key]
  }
  return key + ' ' + value
}
