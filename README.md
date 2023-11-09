# Práctica 4 - Jesús Cuesta Bartolomé

## Funciones

El programa consta de los siguientes endpoints:

1. Un endpoint por defecto que devuelve un mensaje de que la API está lista.

2. `.post("/addCoche", addCoche)` Este endpoint permite publicar un nuevo coche. 
Para ello se deben introducir los siguientes parámetros en el body de la petición:
```
{
    "matricula": "000 XXX",
    "nombre": "Volkswagen Polo",
    "precio": 35000
}
```

3. `.delete("/deleteModeloCoche/:matricula", deleteModeloCoche)` Este endpoint permite eliminar un coche de la base de datos. Para ello se debe introducir la matrícula del coche en la URL.

4. `.post("/addConcesionario", addConcesionario)` Este endpoint permite publicar un nuevo concesionario.
Para ello se deben introducir los siguientes parámetros en el body de la petición:
```
{
    "nombre": "Concesionario de prueba"
}
```

5. `.delete("/deleteConcesionario/:nombre", deleteConcesionario)` Este endpoint permite eliminar un concesionario de la base de datos. Para ello se debe introducir el nombre del concesionario en la URL.

6. `.post("/addCliente", addCliente)` Este endpoint permite añaadir un nuevo cliente.
Para ello se deben introducir los siguientes parámetros en el body de la petición:
```
{
    "dni": "00000000X",
    "nombre": "Pedro",
    "dinero": 10000
}
```

7. `.delete("/deleteCliente/:dni", deleteCliente)` Este endpoint permite eliminar un cliente de la base de datos. Para ello se debe introducir el DNI del cliente en la URL.

8. `.post("/sendCoche/:matriculacoche/:nombreconcesionario", sendCoche)` Este endpoint permite enviar un coche creado previamente a un concesionario. Para ello se deben introducir la matrícula del coche y el nombre del concesionario que lo va a recibir en la URL.

9. `.get("/getCochesConcesionario/:concesionario", getCochesConcesionario)` Este endpoint permite obtener todos los coches que hay en un concesionario. Para ello se debe introducir el nombre del concesionario en la URL.

10. `.post("/sellCoche/:nombreconcesionario/:matriculacoche/:dnicliente", sellCoche)` Este endpoint permite vender un coche a un cliente. Para ello se deben introducir el nombre del concesionario, la matrícula del coche y el DNI del cliente en la URL.

11. `.get("/getCochesCliente/:dnicliente", getCochesCliente)` Este endpoint permite obtener todos los coches que tiene un cliente. Para ello se debe introducir el DNI del cliente en la URL.

12. `.delete("/deleteCocheConcesionario/:matriculacoche/:nombreconcesionario", deleteCocheConcesionario)` Este endpoint permite eliminar un coche de un concesionario. Para ello se deben introducir la matrícula del coche y el nombre del concesionario en la URL. Eliminar un coche de un concesionario no supone la eliminación de dicho coche de la base de datos, sino que simplemente se elimina la relación entre el coche y el concesionario.

13. `.delete("/deleteCocheCliente/:matriculacoche/:dni", deleteCocheCliente)` Este endpoint permite eliminar un coche de un cliente. Para ello se deben introducir la matrícula del coche y el DNI del cliente en la URL. Eliminar un coche de un cliente no supone la eliminación de dicho coche de la base de datos, sino que simplemente se elimina la relación entre el coche y el cliente.

14. `.post("/traspasoCoche/:matriculacoche/:dnitraspasa/:dnirecibe", traspasoCoche)` Este endpoint permite traspasar un coche de un cliente a otro de manera gratuita. Para ello se deben introducir la matrícula del coche, el DNI del cliente que traspasa el coche y el DNI del cliente que recibe el coche en la URL.

15. `.post('/addDinero/:dni/:cantidad', addDinero)` Este endpoint permite añadir dinero a un cliente. Para ello se deben introducir el DNI del cliente y la cantidad de dinero que se quiere añadir en la URL. También se puede restar dinero a un cliente introduciendo una cantidad negativa.

16. `.post('/bloquearVenta/:nombreConcesionario/:estadoBloqueo', bloquearVentas)` Este endpoint permite bloquear las ventas de un concesionario. Para ello se deben introducir el nombre del concesionario y el estado de bloqueo (true o false) en la URL. Este bloqueo impide que se puedan vender coches de ese concesionario.