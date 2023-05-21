frontend = container "Frontend" {
  technology "vercel"
  description "Frontends utilizados no sistema todo"

  sysadmin = component "Gestor de Sistema" {
    technology "vercel"
    description "Frontend para gestão do sistema como um todo"

    this -> api_gateway.logs "Consome" "GraphQL"
    this -> api_gateway.billing "Consome" "GraphQL"
    this -> api_gateway.resellers "Consome" "GraphQL"
  }

  reseller = component "Gestor de Revenda" {
    tags "Resell"
    technology "vercel"
    description "Frontend para gestão dos revendedores"

    this -> api_gateway.logs "Consome" "GraphQL"
    this -> api_gateway.billing "Consome" "GraphQL"
    this -> api_gateway.resellers "Consome" "GraphQL"
    this -> api_gateway.clients "Consome" "GraphQL"
  }

  client = component "Gestor de Cliente" {
    tags "B2B"
    technology "vercel"
    description "Frontend para gestão dos clientes"

    this -> api_gateway.logs "Consome" "GraphQL"
    this -> api_gateway.billing "Consome" "GraphQL"
    this -> api_gateway.clients "Consome" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
  } 

  app_agenda = component "Aplicativo de Agenda" {
    tags "B2B"
    technology "vercel"
    description "Frontend para aplicativo de Agendamento"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
    this -> api_gateway.applications "Consome" "GraphQL"
  }

  app_groupchat = component "Aplicativo de Chat em Grupo" {
    tags "B2B"
    technology "vercel"
    description "Frontend para aplicativo de Chat em Grupo"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
    this -> api_gateway.applications "Consome" "GraphQL"
  }

  app_chat = component "Aplicativo de Chat Individual" {
    tags "B2B"
    technology "vercel"
    description "Frontend para aplicativo de Chat Individual"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
    this -> api_gateway.applications "Consome" "GraphQL"
  }

  app_automation = component "Aplicativo de Automação" {
    tags "B2B"
    technology "vercel"
    description "Frontend para aplicativo de automação"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.automations "Consome" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
    this -> api_gateway.applications "Consome" "GraphQL"
  }

  app_caller = component "Aplicativo de Chamadas" {
    tags "B2B"
    technology "vercel"
    description "Frontend para aplicação de chamadas ativas"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.workspaces "Consome" "GraphQL"
    this -> api_gateway.applications "Consome" "GraphQL"
  }
}