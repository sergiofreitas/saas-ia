import { permissions } from './permissions'

export const checkPermission = (role, resource, action, subject) => {
  const permList = permissions[resource][role]

  if (!permList) {
    return false
  }

  const perm = permList.find((it) => it.action === action)

  if (!perm) {
    return false
  }

  if (subject) {
    const re = new RegExp(perm.subject)
    return subject.match(re)
  }

  return true
}
