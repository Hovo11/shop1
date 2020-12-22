
export default function programmer({ next, router }) {
  let type= JSON.parse(localStorage.getItem('user'))
  if (type.role!=='programmer') {
    return router.push({ name: 'Hello' }).catch(() => {});
  }
  return next();
}
