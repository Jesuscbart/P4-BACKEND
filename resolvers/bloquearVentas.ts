import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";

const bloquearVentas = async (req: Request, res: Response) => {
  const { nombreConcesionario, estadoBloqueo } = req.params;         // Obtener los parámetros de la URL
  
  // Buscar el concesionario por nombre
  const concesionario = await ConcesionarioModel.findOne({ nombre: nombreConcesionario });
  if (!concesionario) {          // Si no existe, devolver error
    const error={
      "error":"dealer_not_found",
      "mensage": "The dealer was not found. "
    }
    return res.status(404).json(error);
  }
  
  // Convertir estadoBloqueo a boolean y actualizar
  const estado = estadoBloqueo.toLowerCase() === 'true';  
  concesionario.ventasBloqueadas = estado;       // Se actualiza el estado de ventasBloqueadas
  
  // Guardar el concesionario actualizado
  await concesionario.save();

  // Devolver mensaje de estado
  //Operador ternario. Si estado es true, devuelve bloqueadas, si no, desbloqueadas (las ventas)
  res.status(200).send(`Las ventas del concesionario ${nombreConcesionario} han sido ${estado ? 'bloqueadas' : 'desbloqueadas'}.`);
};

export default bloquearVentas;  // Exportar la función