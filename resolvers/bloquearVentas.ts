// bloquearVenta.ts

import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";

const bloquearVentas = async (req: Request, res: Response) => {
  const { nombreConcesionario, estadoBloqueo } = req.params;
  
  // Buscar el concesionario por nombre
  const concesionario = await ConcesionarioModel.findOne({ nombre: nombreConcesionario });
  if (!concesionario) {
    res.status(404).send("Concesionario no encontrado");
    return;
  }
  
  // Convertir estadoBloqueo a boolean y actualizar
  const estado = estadoBloqueo.toLowerCase() === 'true';
  concesionario.ventasBloqueadas = estado;
  
  // Guardar el concesionario actualizado
  await concesionario.save();

  const estadoMensaje = estado ? 'bloqueadas' : 'desbloqueadas';
  res.status(200).send(`Las ventas del concesionario ${nombreConcesionario} han sido ${estadoMensaje}.`);
};

export default bloquearVentas;