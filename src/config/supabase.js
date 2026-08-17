import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let validUrl = supabaseUrl;
if (!validUrl || !validUrl.startsWith('http')) {
  console.warn('⚠️ Atenção: Variáveis de ambiente do Supabase não encontradas ou inválidas no backend. Use URLs reais.');
  validUrl = 'https://aguardando-chaves.supabase.co';
}

export const supabase = createClient(validUrl, supabaseKey || 'public-anon-key', {
  auth: {
    persistSession: false // It's a server, no need to persist session
  }
});
