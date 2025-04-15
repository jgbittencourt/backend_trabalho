const knex = require('./../database');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');


module.exports={
    async create(req, res){
        try {
            const { nome } = req.body;
            const { email } = req.body;
            const { uf } = req.body;
            const { level } = req.body;
            const password = await bcrypt.hash(req.body.password, 10);
            
            const result = await knex('clientes').where({ email });
            if (result.length === 1){
                return res.status(400).send({ erro: 'Email já cadastrtado'});
            }
            await knex('clientes')
                .insert({ nome, email, uf, level, password });
                return res.status(201).send( { nome, email, uf, level, password});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
    async searchUsersAll(req, res){
        try {
            const result = await knex('clientes');
            return res.status(200).send(result);
            
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async searcherUser( req, res){
        try{
            const { email } =req.body;
            const { password } =req.body;

            if(email == undefined || password == undefined){
                console.log(('mensagem:Error de requisição - requisição sem email ou senha'));
                return res.status(401).send({mensagem:'Error de requisição - requisição sem email ou senha'});
                
            }
            const [ result ] = await knex('clientes').where({email});
            console.log(result); //Somente para teste do resultado

            if(result != undefined ){
                bcrypt.compare(password, result.password, (err, respok) =>{
                    if(err){
                        return res.status(401).send({mensagem:'Falha na autenticação - error interno bcrypt'});
                    }
                    if(respok){
                        const token = jwt.sign({
                            idUser:result.id,
                            nome:result.nome,
                            email:result.email,
                            level:result.level
                        },'segredo',{expiresIn: '1h'});
                        return res.status(200).send({
                            token:token,
                            mensagem:'Autenticação - realizada com sucesso !!!'
                        });
                    }
                    return res.status(401).send({mensagem:'Falha na autenticação - Senha incorreta !!!'});
                });
            }else{
                return res.status(401).send({mensagem:'Falha na autenticação - email incorreto !!!'});
            }
            

        } catch(error){

        }
    },

    async updateClient(req, res){
        try{
            const { codcli } =req.body;
            const { nome } =req.body;
            const { email } =req.body;
            const { uf } =req.body;
            const {level } =req.body;
            const  password  = await bcrypt.hash(req.body.password, 10);

            const result = await knex ('clientes').where( { codcli } );''
            if(result.length === 1){
                await knex('clientes').update({ nome, email, uf, level, password}).where({codcli});
                return res.status(201).send();  
            }else{
                return res.status(400).send({ error:'Código do cliente inválido !!!' });
            }
        }catch(error){
            return res.status(400).json({error: error.message});
        };
    }
}