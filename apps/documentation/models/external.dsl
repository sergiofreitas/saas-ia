
auth = container "Authentication" {
  tags "External"
  technology "nhost"
  description "Apis para autenticação de usuarios"

  api_gateway -> this "Consome" "GraphQL"
}

storage = container "Storage" {
  tags "External"
  technology "nhost"
  description "Apis para armazenamento de midias"

  api_gateway -> this "Consome" "GraphQL"
}
