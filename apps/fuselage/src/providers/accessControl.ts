import { type AccessControlProvider } from '@refinedev/core'
import { checkPermission } from '@/domains/accessControl'
import { authProvider } from './auth'

const accessControlProvider: AccessControlProvider = {
  can: async ({ action, params, resource }) => {
    const roles = (await authProvider.getPermissions()) as string[]
    const subject = action === 'field' ? params?.field : params?.id

    for (const role of roles) {
      const response = checkPermission(role, resource, action, subject)
      if (response) {
        return {
          can: true,
        }
      }
    }

    return {
      can: false,
    }
  },
}

export default accessControlProvider
