import { AuthBindings } from '@refinedev/core'
import { nhost } from './data'

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { error } = await nhost.auth.signIn({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Erro de Login',
        },
      }
    }

    return {
      success: true,
      redirectTo: '/',
    }
  },

  logout: async () => {
    const { error } = await nhost.auth.signOut()
    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Erro de Logout',
        },
      }
    }

    return {
      success: true,
      redirectTo: '/login',
    }
  },

  onError: async (error) => {
    if (error.status === 401) {
      nhost.auth.refreshSession()
    }

    return {}
  },

  check: async () => {
    const isAuth = await nhost.auth.isAuthenticatedAsync()
    if (isAuth) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
      error: {
        message: 'Falha na validação',
        name: 'Não autenticado',
      },
    }
  },

  getPermissions: async () => {
    const user = nhost.auth.getUser()
    if (user) {
      return user.roles
    }

    return []
  },

  getIdentity: async () => {
    const user = nhost.auth.getUser()

    if (user) {
      return {
        ...user,
        name: user.displayName,
        avatar: user.avatarUrl,
      }
    }

    return null
  },

  register: async (params) => {
    const { error } = await nhost.auth.signUp(params)

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Erro de registro',
        },
      }
    }

    return {
      success: true,
      redirectTo: '/',
    }
  },

  updatePassword: async ({ newPassword }) => {
    const { error } = await nhost.auth.changePassword({ newPassword })

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Erro de update',
        },
      }
    }

    return {
      success: true,
    }
  },

  forgotPassword: async ({ email }) => {
    const { error } = await nhost.auth.resetPassword({ email })

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Erro de senha',
        },
      }
    }

    return {
      success: true,
    }
  },
}
