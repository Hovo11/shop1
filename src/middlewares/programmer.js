
export default function programmer({ next, router }) {
  let type= JSON.parse(localStorage.getItem('user'))
  if (type.type!=='customer') {
    return router.push({ name: 'Hello' }).catch(() => {});
  }
  return next();
}
