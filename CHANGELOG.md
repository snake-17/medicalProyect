# Modificaciones

fecha enero 19

## Tabla appoinments

le quite la datetime, por date, porque por accidente puse una fecha distinta a su respectivo timeblock y lo almaceno, lo que no protege la integridad de los datos.

## Tabla timeblock

modifique la columna timeblockstart y end, porque son datetime, y solo quiero guardar la hora
prisma no permite guardar time, por lo que lo dejare en string
tambien con la seed_timeblock, hare un catalogo porque las horas se repiten en este ejemplo de consultorio.

# seed

borrare la seed actual, por una seed que crea un catalogo de horas en timeblock
tenia un error al ejecutar la seed, porque tenia create y le pasaba un arreglo de objetos.
tenia que especificar "createMany" si le iba a pasar el arreglo de objetos.

# modificaciones

enero 20

# adminService.js

el admin crea los timeblocks, pero ahora como es catalogo, no tiene sentido que los cree los timeblock.
Ahora tiene que asignar una hora, cambiar de disponible a ocupado segun la hora.
Por lo que cree una nueva tabla en el schema llamada schedule.

# schema

ahora cree una tabla schedule, donde esta tendra el registro
de las disponibilidades de las citas, mas la fecha. para
que mantener la integridad.

# createTimeBlock

ahora tengo que modificar esta funcion que creaba un bloque de tiempo, para que solo asigne, porque los bloques de tiempo ya estan hechos.
Le cambiare el nombre, a "createSchedule.
Igual manera cambie el service de createTimeblock a createSchedule.

# listReservationService

modificamos esta peticion get, porque este trae el timeblock. Como ahora muestra el sistema, el usuario y el timeblock pero del schedule.

## registerUser

no tenia una validacion por si el email ya se habia registrado asi que agregamos esta validacion,
pero tambien se modifica el register en el controller, porque aqui devuelve error 409

al modificar registerUserService cuando lanzo el error
throw new Error(EMAIL_ALREADY_EXISTS);
no lo puse como string, por lo que interpreta que es una variable.
lo que debi haber hecho es ponerlo como string
throw new Error("EMAIL_ALREADY_EXISTS");

# 22 enero

## reservationController

en la funcion de update, tenia el problema de tener solo el userId y el nuevo horario, pero como ahora hay una tabla nueva tenia problemas.
ahora recibe el userId el horario y la inovacion es que recibe el appointmentId, porque para saber cual horario esta cambiando.
Como un horario solo tiene una cita, con saber la cita, se que horario esta cambiando.

## reservationService

Como ahora recibo la cita, para cambiar el viejo horario, entonces tuve que quitar casi todo.
Para que revise si el userId coincide con la cita.
Como una cita tiene solo un horario, con tener el id de la cita tengo el horario que quiere cambiar.
Cambio el horario viejo a true para que alguien lo pueda elegir y el nuevo lo cambio a false, para indicar que el nuevo ya esta en uso.
Ya al ultimo modifico la tabla appointment para que el usuario tenga su horario de su cita.
