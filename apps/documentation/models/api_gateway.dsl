api_gateway = container "API Gateway" {
  technology "nhost"
  description "Apis de gateway para acesso ao banco ou ações"

  executor = component "Executor" {
    technology "Federation"
    description "Entidade que executa as requisições no AI Executor. Funciona como gateway de execuções e subscription para execuções longas"

    this -> ai_executor "Consome" "HTTP"
  }

  authorization = component "Authorization" {
    technology "Hasura"
    description "Entidade que garante as permissões de uma maneira mais detalhada"
  }

  logs = component "Logs" {
    technology "Database"
    description "Dominio que registra todas as operações feitas no sistema, para fins de cobrança ou logs de atividades"

    ai_executor -> this "Produz" "HTTP"
  }

  automations = component "Automations" {
    technology "Database"
    description "Dominio que armazena todas as automações da plataforma, bem como suas execuções"
  }

  resellers = component "Resellers" {
    technology "Database"
    description "Dominio que controla todos os aspectos de um reseller" 
  }

  clients = component "Clients" {
    technology "Database"
    description "Dominio que controla todos os aspectos de um cliente" 
  }

  workspaces = component "Workspaces" {
    technology "Database"
    description "Dominio que controla todos os aspectos de um workspace"

    ai_executor -> this "Valida" "GraphQL"
  }

  applications = component "Applications" {
    technology "Database"
    description "Dominio que controla todos os aspectos dos aplicativos internos"    
  }

  billing = component "Billing" {
    technology "Database"
    description "Dominio que controla todos os aspectos de pagamentos (in e out)"
  }
}
