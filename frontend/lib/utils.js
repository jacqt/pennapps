
export function getUserFromData(data) {
  if (!data || !data.user) return null
  return Object.assign(data.user, {
    items: data.items,
    auth_token: data.authentication_token,
    balance: data.balance,
    items: data.items,
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
  // TODO(Taimur): mapping correct?
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
