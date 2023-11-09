import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";
import ConcesionarioModel from "../db/concesionario.ts";
import ClienteModel from "../db/cliente.ts";

const sellCoche = async (req: Request, res: Response) => {
  const { nombreconcesionario, matriculacoche, dnicliente } = req.params;   // Parámetros de la URL

  try {
    // Buscar el concesionario
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario });  // Buscar el concesionario por nombre
    if (!concesionario) {                         // Si no se encuentra el concesionario
      const error={                               // Devolver error
        "error":"dealer_not_found",
        "mensage": "The dealer was not found. "
      }
      return res.status(404).json(error);
    }

    // Verificar si el concesionario tiene bloqueadas las ventas
    if (concesionario.ventasBloqueadas) {           // Si el concesionario tiene bloqueadas las ventas
        const error={                               // Devolver error
          "error":"blocked_sales",
          "mensage": "The dealer's sales are currently blocked. "
        }
        return res.status(403).json(error);
    }

    // Buscar el coche
    const coche = await CocheModel.findOne({ matricula: matriculacoche });  // Buscar el coche por matrícula
    if (!coche) {                                 // Si no se encuentra el coche
      const error={                               // Devolver error
        "error":"car_not_found",
        "mensage": "The car was not found. "
      }
      return res.status(404).json(error);
    }

    // Comprobar que el coche pertenece al concesionario
    if (!concesionario.coches.includes(coche._id)) {  // Si el coche no está en la lista de coches del concesionario
      const error={                                   // Devolver error
        "error":"car_does_not_belong_to_dealer",
        "mensage": "The car does not belong to the dealer. "
      }
      return res.status(400).json(error);
    }

    // Buscar el cliente
    const cliente = await ClienteModel.findOne({ dni: dnicliente }); // Buscar el cliente por DNI
    if (!cliente) {                                                  // Si no se encuentra el cliente
      const error={                                                  // Devolver error
        "error":"client_not_found",
        "mensage": "The client was not found in the database. "
      }
      return res.status(404).json(error);
    }

    // Comprobar que el cliente tenga suficiente dinero
    if (cliente.dinero < coche.precio) {  // Si el cliente no tiene suficiente dinero
      const error={                       // Devolver error
        "error":"not_enough_money",
        "mensage": "The customer does not have enough money to perform the transaction. "
      }
      return res.status(400).json(error);
    }

    // Retirar el coche del concesionario
    concesionario.coches = concesionario.coches.filter((cocheId) => cocheId.toString() !== coche._id.toString()); // Filtrar la lista de coches del concesionario para eliminar el coche
    // El método filter recibe una función que se ejecuta por cada elemento de la lista. Si devuelve true, el elemento se mantiene en la lista. Si devuelve false, el elemento se elimina de la lista.

    await concesionario.save(); // Guardar el documento actualizado del concesionario

    // Agregar el coche al cliente y actualizar su dinero
    cliente.coches.push(coche._id); // Agregar el coche a la lista de coches del cliente
    cliente.dinero -= coche.precio; // Restar el precio del coche al dinero del cliente

    await cliente.save(); // Guardar el documento actualizado del cliente

    res.status(200).send({  // Devolver mensaje de éxito con los datos del coche y del cliente
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
    res.status(500).send("Error interno del servidor"); // Devolver mensaje de error
  }
};

export default sellCoche; // Exportar la función
