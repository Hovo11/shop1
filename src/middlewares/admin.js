export default function admin({ next, router }) {
  let type= JSON.parse(localStorage.getItem('user'))
  if (type.type==='admin') {
    return next();
  }

}
