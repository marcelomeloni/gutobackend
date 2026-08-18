import { supabase } from './src/config/supabase.js';

async function test() {
  const { data, error } = await supabase.from('leads').insert([{
    nome: "Teste Lead",
    telefone: "9999999999",
    origem: "WhatsApp",
    engajamento: "Frio"
  }]).select().single();
  
  if (error) {
    console.error("ERRO:", error);
  } else {
    console.log("SUCESSO:", data);
  }
}

test();
