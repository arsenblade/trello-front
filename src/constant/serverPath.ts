export const API_URL = 'https://test-server-bay.vercel.app'

export const getLoginUrl = () => '/login'
export const getRegisterUrl = () => '/users'
export const getUsersUrl = () => '/users'
export const getBoardsUrl = (string?: string) => string ? '/boards/' + string : '/boards'