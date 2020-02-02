//aquí vamos a tener las actions que son los disparadores de cambio de estado, llamada a middleware, reducers y cambio en store y state
//son solo funciones que devuelven objetos con type of action, and payload.

export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload : user
})
