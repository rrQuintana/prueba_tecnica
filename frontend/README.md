# Sistema de Administración de Usuarios
Este proyecto frontend es una solución para una prueba técnica que consiste en un sistema de administración de usuarios. El sistema está construido utilizando autenticación mediante JSON Web Tokens (JWT) y las sesiones son administradas por Redux. Las rutas están protegidas tanto en el backend para los endpoints como en el frontend para las rutas privadas y protegidas. Dentro del proyecto existen dos tipos de usuarios: los adminsitradores, los cuáles tienen permisos de agregar, eliminar y editar usuarios; y los usuarios normales que solo tienen permisos de lectura, los correos tienen que ser únicos, los inputs contienen validaciones.

## Instrucciones de Ejecución
Antes de ejecutar el proyecto frontend, es necesario asegurarse de que el backend esté en funcionamiento, ya que el frontend se conectará a las API proporcionadas por el backend.

### Ejecutar el Backend: 
Siga las instrucciones proporcionadas en el README del proyecto backend para poner en marcha el servidor. Asegúrese de que el backend esté ejecutándose correctamente antes de continuar.

### Instalar Dependencias: 
En el directorio raíz del proyecto frontend, ejecute el siguiente comando para instalar todas las dependencias necesarias:

``` npm install ``` 

### Modo de Desarrollo: 
Una vez que todas las dependencias se hayan instalado correctamente, puede iniciar el servidor de desarrollo con el siguiente comando:

``` npm run dev ``` 
Esto iniciará el servidor de desarrollo y abrirá la aplicación en su navegador predeterminado.

### Notas Adicionales
- Asegúrese de que las URL de conexión al backend estén configuradas correctamente en el archivo de configuración del frontend.
- Si encuentra algún problema durante la ejecución del proyecto, consulte la sección de resolución de problemas en el README o comuníquese con el desarrollador del proyecto.
- Para cualquier consulta o asistencia adicional, no dude en ponerse en contacto con el equipo de desarrollo.