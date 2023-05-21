ai_executor = container "AI Executor" {
  technology "steamship"
  description "Apis para execução de modelos AI"

  question_answer = component "Question Answer" {
    technology "qa_with_tools"
    description "Package com ferramentas para perguntas e respostas utilizando ferramentas"
  }

  content_creator = component "Content Creator" {
    technology "content_creator"
    description "Package com ferramentas para geração de conteudo, baseado nos inputs e prompts do workspace"
  }

  media_creator = component "Media Creator" {
    technology "media_creator"
    description "Package com ferramentas para geração de midias (Imagem/Video), baseado nos inputs e prompts do workspace"
  }
}