// addDinero.ts

import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const addDinero = async (req: Request, res: Response) => {
  const { dni, cantidad } = req.params;

  // Convertimos cantidad a número y validamos que sea un número válido
  const cantidadNumerica = parseFloat(cantidad);
  if (isNaN(cantidadNumerica)) {
    res.status(400).send("Cantidad inválida");
    return;
  }

  // Buscar el cliente por DNI
  const cliente = await ClienteModel.findOne({ dni });
  if (!cliente) {
    res.status(404).send("Cliente no encontrado");
    return;
  }

  // Sumar la cantidad al dinero actual del cliente
  cliente.dinero += cantidadNumerica;

  // Guardar el cliente actualizado
  await cliente.save();

  res.status(200).send({
    dni: cliente.dni,
    nombre: cliente.nombre,
    dinero: cliente.dinero,
  });
};

export default addDinero;
