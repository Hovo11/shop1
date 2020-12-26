
export default function manager({ next, router }) {
  let type= JSON.parse(localStorage.getItem('user'))
  if (type.role==='admin') {
    return next();
  }else if(type.type!=='seller'){
    return router.push({ name: 'Hello' }).catch(() => {});
  }
  else return next();
}
