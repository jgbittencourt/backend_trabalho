const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT ?? 3344, 
    ()=> process.env.PORT ? console.log('Porta do servidor:' + process.env.PORT) : 
                            console.log('Servidor rodando na porta 3344'));
    
     