import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import CocheModel from "../db/coche.ts";

const traspasoCoche = async (req: Request, res: Response) => {
  const { matriculacoche, dnitraspasa, dnirecibe } = req.params;  // Parámetros de la URL

  // Buscar el coche por matrícula
  const coche = await CocheModel.findOne({ matricula: matriculacoche });  // Buscar el coche por matrícula
  if (!coche) {                                                           // Si no se encuentra el coche
    const error={                                                         // Devolver error
      "error":"car_not_found", 
      "mensage": "The car was not found. "
    }
    return res.status(404).json(error);
  }

  // Buscar el cliente que traspasa el coche
  const clienteTraspasa = await ClienteModel.findOne({ dni: dnitraspasa }); // Buscar por DNI
  if (!clienteTraspasa) {                                                   // Si no se encuentra el cliente
    const error={                                                           // Devolver error
      "error":"client_not_found", 
      "mensage": "The client who transfers the car was not found. "
    }
    return res.status(404).json(error);
  }

  // Verificar que el cliente actual posee el coche
  if (!clienteTraspasa.coches.includes(coche._id)) {          // Si el cliente no posee el coche
    const error={                                             // Devolver error
      "error":"car_does_not_belong_to_client", 
      "mensage": "The car does not belong to the client. "
    }
    return res.status(400).json(error);
  }

  // Buscar el cliente que recibe el coche
  const clienteRecibe = await ClienteModel.findOne({ dni: dnirecibe });   // Buscar por DNI
  if (!clienteRecibe) {                                                   // Si no se encuentra el cliente
    const error={                                                         // Devolver error
      "error":"client_not_found",  
      "mensage": "The client who receives the car was not found. "
    }
    return res.status(404).json(error);
  }

  // Eliminar el coche del cliente que traspasa
  clienteTraspasa.coches = clienteTraspasa.coches.filter(id => !id.equals(coche._id));  // Filtrar la lista de coches del cliente
  // El método filter recibe una función que se ejecuta por cada elemento de la lista. Si la función devuelve true, el elemento se mantiene en la lista. Si devuelve false, el elemento se elimina de la lista.

  await clienteTraspasa.save(); // Guardar el documento actualizado del cliente que traspasa

  // Añadir el coche al cliente que recibe
  clienteRecibe.coches.push(coche._id); 

  await clienteRecibe.save(); // Guardar el documento actualizado del cliente que recibe

  res.status(200).send({  // Devolver mensaje de éxito
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

export default traspasoCoche; // Exportar la función
