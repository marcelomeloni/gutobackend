import * as authService from './auth.service.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    if (!nome || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    const data = await authService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
