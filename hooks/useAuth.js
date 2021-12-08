import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { getCurrentDate } from '../hooks/useDate'

const expectLoggedIN = () => {
  const router = useRouter()
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if(!cookies.token){
      router.push('/login')
    }
  }, [])
}

const expectLoggedOUT = () => {
  const router = useRouter()
  const [cookies] = useCookies(['token']);
  const login = useSelector((state) => state.token.value.login)

  useEffect(() => {
    if(cookies.token){
      router.push(`/${login}/nutrition-diary/${getCurrentDate()}`)
    }
  }, [])
}

export { expectLoggedIN, expectLoggedOUT }