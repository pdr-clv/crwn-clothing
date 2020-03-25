const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const path = require('path');
// path no hace falta importar ni incluir en las dependencias, es nativa de node.js
//este if es para mantener la clave de Stripe guardada en .env oculta, si está en versión de producción
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//vamos a importar la libreria stripe, es una importación un poco especial, necesita el parametro SecretKey. lo hacemos después de definir si está en production o no, para poder acceder a la Secret Key

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//definimos app, que será el objeto que ejecutará todos los eventos de la librería express.
const app = express();
// si existe port, definido por heroku cuanto se postea la aplicación, lo pondrá heroku, sino, cuanto estamos en localhost, el PORT será 5000. La aplicación cliente tiene puerto 3000 y 5000 para el servidor
const port = process.env.PORT || 5000;

// cualquier request, ya te la convierte directamente en json.
app.use(bodyParse.json());
//cualquier caracter que se incluya en la cadena de texto del url, te eliminar y limpia de espacios y caracteres no permitidos con simbolos.
app.use(bodyParse.urlencoded({ extended: true }));
//cliente tiene puerto 3000, backend 5000, como origen y backend es diferente, habría un error CORS, cors te permite poder trabajar con diferentes puertos de origenes de datos
app.use(cors());

//si la aplicación está en modo production, vamos a servir todos archivos estaticos que hay en /client/build, que es donde se guardaran todos los archivos react, cuando se haga el build.
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
//para cualquier url que el cliente consulta '*' existirá un request, y una respuesta.
  app.get('*',function(req,res){
//la respuesta res. será que enviará el archivo js, css, html estático
    res.sendFile(path.join(__dirname,'client/build', 'index.html'));
  });
}

app.listen(port,err => {
  if (err) throw err;
  console.log('Server running on port ' + port);
});

// generamos una ruta, para registrar el pago. Desde el cliente, se hará una solicitud a backend a esta ruta, y esta ruta hará un post a cliente.
//tiene el primer parametro, la ruta, y el segundo parametro es una función, con parametros request y response
//recibirá la información de onToken de la aplicación cliente.
//el backend podrá acceder al API Stripe, y dará la autenticidad con el token guardado en la variable ENV STRIPE_SECRET_KEY
app.post('/payment', (req,res) => {
//el objeto body será el encargado de pasar la información que necesitta Stripe
  const body = {
//el objeto req que se recibe de cliente, tiene la propiedad body.
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
//como ya está definido el objeto stripe, importado de la libreria stripe. se utiliza la función charges.create. Necesita dos parametros, uno es el body, ya definido, y el otro parámetro es una callback, que se ejecuta cuando ha sido ejecutado con éxito.
//en el callback, se informará a cliente que ha sido hecho con éxito el cargo, o no se ha podido realizar.
  stripe.charges.create(body, (stripeErr,stripeRes)=>{
    if(stripeErr){
      res.status(500).send({ error: stripeErr });
//status 500 es un estado que informa que ha habido un error en la solicitud
    }
    res.status(200).send({success: stripeRes});
  });
});