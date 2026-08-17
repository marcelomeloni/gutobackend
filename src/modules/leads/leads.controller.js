import * as leadsService from './leads.service.js';

export const getAll = async (req, res) => {
  try {
    const { captado_por } = req.query;
    const data = await leadsService.getLeads(captado_por);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await leadsService.getLeadById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await leadsService.createLead(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await leadsService.updateLead(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEngajamento = async (req, res) => {
  try {
    const { engajamento } = req.body;
    if (!engajamento) {
      return res.status(400).json({ error: 'Campo engajamento é obrigatório.' });
    }
    const data = await leadsService.updateLead(req.params.id, { engajamento });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await leadsService.deleteLead(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
