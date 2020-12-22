// src/middleware/auth.js
export default function auth({ next, router }) {
  if (!localStorage.getItem('access_token')) {
    localStorage.removeItem('user')
    return router.push({ name: 'Login' }).catch(() => {});
  }

  return next();
}
