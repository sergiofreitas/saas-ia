workspace "Gaia" "Software para construção de modelos de AI e software para auxiliar pequenas e medias empresas" {
  !docs ./markdown
  !adrs ./adrs

  !identifiers hierarchical

  model {
    customer = person "Cliente Final" {
      tags "Customer"
    }
    business = person "Cliente B2B" {
      tags "B2B"
    }
    reseller = person "Revendedor" {
      tags "Resell"
    }
    staff = person "Staff do Produto"

    platform = softwareSystem "Plataforma Gaia" {
      description "Plataforma de whitelabel com foco em utilização de IA para soluções"
      !include models
    }

    staff -> platform.frontend.sysadmin "Acessa"
    reseller -> platform.frontend.reseller "Acessa"

    business -> platform.frontend.client "Acessa"
    business -> platform.frontend.app_agenda "Acessa"
    business -> platform.frontend.app_automation "Acessa"
    business -> platform.frontend.app_caller "Acessa"
    business -> platform.frontend.app_chat "Acessa"
    business -> platform.frontend.app_groupchat "Acessa"

    customer -> platform.bots.web "Utiliza"
    customer -> platform.bots.telegram "Utiliza"
    customer -> platform.bots.instagram "Utiliza"
    customer -> platform.bots.messenger "Utiliza"
    customer -> platform.bots.whatsapp "Utiliza"
    customer -> platform.bots.voice "Utiliza"
    platform.bots.sms -> customer "Utiliza"
  }

  views {
    !include views

    styles {
      element "Customer" {
        background #999999
      }
      element "B2B" {
        background #3f8624
        color #ffffff
      }
      element "Resell" {
        background #693cc5
        color #ffffff
      }
    }

    theme default
    theme https://static.structurizr.com/themes/amazon-web-services-2020.04.30/theme.json
  }
}