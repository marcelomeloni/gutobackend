import fs from 'fs';
import path from 'path';

const modules = [
  'bairros',
  'marketing',
  'imprensa',
  'tarefas',
  'agenda',
  'estoque',
  'financeiro',
  'usuarios'
];

const basePath = path.join(process.cwd(), 'src', 'modules');

modules.forEach(mod => {
  const modPath = path.join(basePath, mod);
  if (!fs.existsSync(modPath)) {
    fs.mkdirSync(modPath, { recursive: true });
  }

  // Service
  const serviceCode = `import { supabase } from '../../config/supabase.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('${mod === 'marketing' ? 'marketing_conteudos' : mod === 'imprensa' ? 'imprensa_veiculos' : mod === 'estoque' ? 'estoque_itens' : mod}').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('${mod === 'marketing' ? 'marketing_conteudos' : mod === 'imprensa' ? 'imprensa_veiculos' : mod === 'estoque' ? 'estoque_itens' : mod}').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase.from('${mod === 'marketing' ? 'marketing_conteudos' : mod === 'imprensa' ? 'imprensa_veiculos' : mod === 'estoque' ? 'estoque_itens' : mod}').insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { data, error } = await supabase.from('${mod === 'marketing' ? 'marketing_conteudos' : mod === 'imprensa' ? 'imprensa_veiculos' : mod === 'estoque' ? 'estoque_itens' : mod}').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('${mod === 'marketing' ? 'marketing_conteudos' : mod === 'imprensa' ? 'imprensa_veiculos' : mod === 'estoque' ? 'estoque_itens' : mod}').delete().eq('id', id);
  if (error) throw error;
  return true;
};
`;

  // Controller
  const controllerCode = `import * as ${mod}Service from './${mod}.service.js';

export const getAll = async (req, res) => {
  try {
    const data = await ${mod}Service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await ${mod}Service.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await ${mod}Service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await ${mod}Service.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await ${mod}Service.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`;

  // Routes
  const routesCode = `import express from 'express';
import * as ${mod}Controller from './${mod}.controller.js';

const router = express.Router();

router.get('/', ${mod}Controller.getAll);
router.get('/:id', ${mod}Controller.getOne);
router.post('/', ${mod}Controller.create);
router.put('/:id', ${mod}Controller.update);
router.delete('/:id', ${mod}Controller.remove);

export default router;
`;

  fs.writeFileSync(path.join(modPath, mod + '.service.js'), serviceCode);
  fs.writeFileSync(path.join(modPath, mod + '.controller.js'), controllerCode);
  fs.writeFileSync(path.join(modPath, mod + '.routes.js'), routesCode);
});

// Remove old 'sistema' folder
const sistemaPath = path.join(basePath, 'sistema');
if (fs.existsSync(sistemaPath)) {
  fs.rmSync(sistemaPath, { recursive: true, force: true });
}

console.log('Scaffolding complete!');
