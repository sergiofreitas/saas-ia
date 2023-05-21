bots = container "Bots" {
  technology "vercel"
  description "Bots que vão fazer a comunicação entre o sistema e as ferramentas de comunicação"

  telegram = component "Telegram" {
    technology "vercel"
    description "função que vai enviar e receber mensagens via telegram"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }

  web = component "Web" {
    technology "vercel"
    description "função que vai enviar e receber mensagens via web (chat embutido)"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }

  whatsapp = component "WhatsApp" {
    technology "twilio"
    description "função que vai enviar e receber mensagens via whatsapp"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }

  instagram = component "Instagram" {
    technology "twilio"
    description "função que vai enviar e receber mensagens via direct do Instagram"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }

  messenger = component "FB Messenger" {
    technology "twilio"
    description "função que vai enviar e receber mensagens via fb messenger"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }

  sms = component "SMS" {
    technology "twilio"
    description "função que envia sms para o cliente"

    this -> api_gateway.logs "Produz" "GraphQL"
  }

  voice = component "Voz" {
    technology "twilio"
    description "função que recebe e faz ligação de voz para os clientes"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
  }
}

automations = container "Automations" {
  technology "vercel"
  description "funções construidas para executar ações de forma automatica"
  
  api_gateway -> this "Trigger" "Event Trigger"
  

  send_message = component "Send Message" {
    technology "vercel"
    description "função que envia uma mensagem para o cliente via bot"

    this -> api_gateway.automations "Consome" "GraphQL"
    this -> api_gateway.logs "Produz" "GraphQL"
    this -> bots "Envia mensagem" "HTTP"
  }

  trigger_ai = component "Trigger AI" {
    technology "vercel"
    description "função que inicia a execução de uma operação em uma AI"

    this -> api_gateway.automations "Consome" "GraphQL"
    this -> api_gateway.logs "Produz" "GraphQL"
    this -> api_gateway.executor "Executa" "GraphQL"
    this -> bots "Envia mensagem" "HTTP"
  }

  mutation = component "Execute Mutation" {
    technology "vercel"
    description "função que executa uma mutação no database"

    this -> api_gateway.automations "Consome" "GraphQL"
    this -> api_gateway.logs "Produz" "GraphQL"
  }
}

cronjobs = container "Cronjobs" {
  technology "vercel"
  description "funções que executam de forma continua"

  trigger_automation = component "Executa automação" {
    technology "vercel"
    description "função que roda a cada 30s e dispara todas as automações de tempo"

    this -> api_gateway.logs "Produz" "GraphQL"
    this -> automations "Trigger" "HTTP" 
  }

  faturamento = component "Faturamento" {
    technology "vercel"
    description "função que roda diariamente para fechar o faturamento do dia dos clientes"

    this -> api_gateway.logs "Produz" "GraphQL"
  }
}
