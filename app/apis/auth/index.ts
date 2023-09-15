import { BASE_URL } from '@components/util/config'

export const signIn = async (user: {
  email: string | undefined
  password: string | undefined
}) => {
  const res = await fetch(BASE_URL + '/auth/login', {
    method: 'POST',
      body: JSON.stringify(user),
   headers: { "Content-Type": "application/json" }
  })
  console.log(res.json())

  return res.json()
}
