import modulesModel from "./model.js";
export const findAllmodules = () => modulesModel.find();
export const findModulesById = (id) => modulesModel.findById(id);
export const findModulesByCid = (cid) => modulesModel.find({course:cid})
export const createModules = (modules) => modulesModel.create(modules);
export const updateModules = (id, modules) =>
  modulesModel.updateOne({ _id: id }, { $set: modules });
export const deleteModules = (id) => modulesModel.deleteOne({ _id: id });
