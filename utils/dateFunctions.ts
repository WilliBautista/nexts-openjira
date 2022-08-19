import { formatDistanceToNow } from 'date-fns'
// import { es } from 'date-fns/locale'

export const getFormatDistanceToNow = ( date: number ) => {
  // const fromNow = formatDistanceToNow( date, { locale: es } ) // pass the locale indicate the language
  const fromNow = formatDistanceToNow( date )
  return `Created ${ fromNow } ago`
}
