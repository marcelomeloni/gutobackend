import * as imprensaService from './imprensa.service.js';

// --- Entrevistas ---

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

// --- Veículos ---

export const getAllVeiculos = async (req, res) => {
  try {
    const data = await imprensaService.getAllVeiculos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVeiculo = async (req, res) => {
  try {
    const data = await imprensaService.createVeiculo(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeVeiculo = async (req, res) => {
  try {
    await imprensaService.removeVeiculo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
