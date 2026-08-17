import * as agendaService from './agenda.service.js';

export const getAll = async (req, res) => {
  try {
    const data = await agendaService.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await agendaService.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log('--- NEW AGENDA POST REQUEST ---');
    console.log('REQ.BODY:', req.body);
    const data = await agendaService.create(req.body);
    console.log('SUCCESS:', data);
    res.status(201).json(data);
  } catch (error) {
    console.error('CONTROLLER ERROR CAUGHT:', error);
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await agendaService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await agendaService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
