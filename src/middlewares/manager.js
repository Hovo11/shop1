
export default function manager({ next, router }) {
  let type= JSON.parse(localStorage.getItem('user'))
  if (type.type==='admin') {
    return next();
  }else if(type.role!=='manager'){
    return router.push({ name: 'Hello' }).catch(() => {});
  }
  else return next();
}
