import React from 'react'

export default function CheckLogin() {
    const _checkSession = async () => {
            if (window.location.pathname !== '/login') {
                { window.location.href = '/login' }
            }
        }
        React.useEffect(() => {
            _checkSession()
        },[])
  return (
    <></>
  )
}
