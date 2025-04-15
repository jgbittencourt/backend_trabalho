const jwt = require('jsonwebtoken');

module.exports =(req, res, next)=>{
    try {
        console.log('Executando a autorização.....');
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        
        if(!authHeader){
            return res.status(401).send({erro:'Requisição sem token'});
        }
        const partsToken = authHeader.split(' ');
        console.log(partsToken);
        
        if(partsToken.length != 2){
            return res.status(401).send({erro:'Token invalido'});
        }
        const [scheme, token] = partsToken;
        console.log('1 =' + scheme);
        console.log('2 =' + token);

        /* Busca através de expessões

        / inicio e fim do elemento de busca
        ^ inicio da verificação
        $ indica o final da verificação
        i insensitive (não case-senitive)
        teste método que executa a procura

        !negação da estrutura condicional if
        */

         if(!/^Bearer$/i.test(scheme)){
            return res.status(401).send({erro:'Token fora do padrão esperado'});
         }
         const decode = jwt.verify(token, 'segredo');
         console.log(decode);
         req.session = decode;
         next();
         
        
    } catch (error) {
        return res.status(400).send({ erro: 'Falha na autenticação - erro de token'});
    }
}