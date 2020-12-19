export default function guest({ from, next, router }) {
  if (localStorage.getItem('access_token')) {
    return from.name ? router.push({name: from.name}) : router.back();
  }
  return next();
}
