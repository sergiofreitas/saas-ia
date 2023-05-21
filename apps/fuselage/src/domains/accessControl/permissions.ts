const allPerms = [
  { action: 'create', subject: '*' },
  { action: 'delete', subject: '*' },
  { action: 'show', subject: '*' },
  { action: 'list', subject: '*' },
  { action: 'edit', subject: '*' },
  { action: 'field', subject: '*' },
]

export const permissions = {
  agents: {
    admin: allPerms,
  },
}
