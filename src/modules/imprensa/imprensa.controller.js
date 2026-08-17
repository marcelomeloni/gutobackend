import * as imprensaService from './imprensa.service.js';

export const getAll = async (req, res) => {
  try {
    const data = await imprensaService.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await imprensaService.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await imprensaService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await imprensaService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await imprensaService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEntrevistas = async (req, res) => {
  try {
    const data = await imprensaService.getAllEntrevistas();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEntrevista = async (req, res) => {
  try {
    const data = await imprensaService.createEntrevista(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEntrevista = async (req, res) => {
  try {
    const data = await imprensaService.updateEntrevista(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeEntrevista = async (req, res) => {
  try {
    await imprensaService.removeEntrevista(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
