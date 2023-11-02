// traspasoCoche.ts

import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import CocheModel from "../db/coche.ts";

const traspasoCoche = async (req: Request, res: Response) => {
  const { matriculacoche, dnitraspasa, dnirecibe } = req.params;

  // Buscar el coche por matrícula
  const coche = await CocheModel.findOne({ matricula: matriculacoche });
  if (!coche) {
    res.status(404).send("Coche no encontrado");
    return;
  }

  // Buscar el cliente que traspasa el coche
  const clienteTraspasa = await ClienteModel.findOne({ dni: dnitraspasa });
  if (!clienteTraspasa) {
    res.status(404).send("Cliente que traspasa no encontrado");
    return;
  }

  // Verificar que el cliente actual posee el coche
  if (!clienteTraspasa.coches.includes(coche._id)) {
    res.status(400).send("El cliente no posee este coche");
    return;
  }

  // Buscar el cliente que recibe el coche
  const clienteRecibe = await ClienteModel.findOne({ dni: dnirecibe });
  if (!clienteRecibe) {
    res.status(404).send("Cliente que recibe no encontrado");
    return;
  }

  // Remover el coche del cliente que traspasa
  clienteTraspasa.coches.pull(coche._id);
  await clienteTraspasa.save();

  // Añadir el coche al cliente que recibe
  clienteRecibe.coches.push(coche._id);
  await clienteRecibe.save();

  res.status(200).send({
    message: "Coche traspasado con éxito",
    coche: {
      id: coche.id,
      matricula: coche.matricula,
      nombre: coche.nombre,
      precio: coche.precio
    },
    dnitraspasa,
    dnirecibe
  });
};

export default traspasoCoche;
