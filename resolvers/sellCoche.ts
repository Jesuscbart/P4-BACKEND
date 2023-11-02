import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";
import ConcesionarioModel from "../db/concesionario.ts";
import ClienteModel from "../db/cliente.ts";

const sellCoche = async (req: Request, res: Response) => {
  const { nombreconcesionario, matriculacoche, dnicliente } = req.params;

  try {
    // Buscar el concesionario
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario });
    if (!concesionario) {
      return res.status(404).send("Concesionario no encontrado.");
    }

    // Verificar si el concesionario tiene bloqueadas las ventas
    if (concesionario.ventasBloqueadas) {
        return res.status(403).send("Las ventas de este concesionario están actualmente bloqueadas.");
    }

    // Buscar el coche
    const coche = await CocheModel.findOne({ matricula: matriculacoche });
    if (!coche) {
      return res.status(404).send("Coche no encontrado.");
    }

    // Comprobar que el coche pertenece al concesionario
    if (!concesionario.coches.includes(coche._id)) {
      return res.status(400).send("El coche no pertenece al concesionario.");
    }

    // Buscar el cliente
    const cliente = await ClienteModel.findOne({ dni: dnicliente });
    if (!cliente) {
      return res.status(404).send("Cliente no encontrado.");
    }

    // Comprobar que el cliente tenga suficiente dinero
    if (cliente.dinero < coche.precio) {
      return res.status(400).send("El cliente no tiene suficiente dinero.");
    }

    // Retirar el coche del concesionario
    concesionario.coches = concesionario.coches.filter((cocheId) => cocheId.toString() !== coche._id.toString());
    await concesionario.save();

    // Agregar el coche al cliente y actualizar su dinero
    cliente.coches.push(coche._id);
    cliente.dinero -= coche.precio;
    await cliente.save();

    res.status(200).send({
      mensaje: "Coche vendido exitosamente",
      coche: {
        id: coche._id,
        matricula: coche.matricula,
        nombre: coche.nombre,
        precio: coche.precio,
      },
      cliente: {
        id: cliente._id,
        dni: cliente.dni,
        nombre: cliente.nombre,
        dinero: cliente.dinero,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default sellCoche;
