import { supabase } from '../../config/supabase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const login = async (email, password) => {
  // Try to find the user
  const { data: user, error } = await supabase.from('usuarios').select('*').eq('email', email).single();
  
  if (error || !user) {
    throw new Error('Usuário não encontrado ou credenciais inválidas.');
  }

  // Compare passwords
  if (!user.senha_hash) {
    throw new Error('Credenciais inválidas.');
  }

  const isValid = await bcrypt.compare(password, user.senha_hash);

  if (!isValid) {
    throw new Error('Credenciais inválidas.');
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  // Return user without password hash
  const { senha_hash, ...userWithoutPassword } = user;
  
  return { user: userWithoutPassword, token };
};

export const register = async (userData) => {
  const { nome, email, password, role, telefone } = userData;
  
  const salt = await bcrypt.genSalt(10);
  const senha_hash = await bcrypt.hash(password, salt);

  const { data, error } = await supabase.from('usuarios').insert([{
    nome,
    email,
    senha_hash,
    role: role || 'militante',
    telefone
  }]).select().single();

  if (error) throw error;
  
  const { senha_hash: _, ...userWithoutPassword } = data;
  return userWithoutPassword;
};
