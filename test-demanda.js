import { createDemanda } from './src/modules/demandas/demandas.service.js';

async function test() {
  try {
    const payload = {
      cidadao_nome: "Teste Demanda",
      cidadao_telefone: "11999999999",
      bairro: "Centro",
      categoria: "saude",
      descricao: "Precisa de asfalto",
      status: "Nova",
      origem: "Demandas"
    };
    
    console.log("Inserindo demanda...");
    const data = await createDemanda(payload);
    console.log("SUCESSO DEMANDA:", data);
  } catch (error) {
    console.error("ERRO DEMANDA:", error);
  }
}

test();
