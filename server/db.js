

const pool = require('pg').pool
const pool = new pool({
    user: 'mahaa',
    host: 'localhost',
    database: 'favlinks',
    password: 2552,
    port: 5432,
})

// Create a link
const createLink = (req,res)=>{
    const name = req.body.name;
    const url = req.body.url;

    pool.query('INSERT INTO links(name, url) VALUES($1, $2)',[name, url], (error, result)=>{
        if(error){
            throw error;
        }
        console.log(req.body);
        res.send("Link successfully added :)")
    });
}
//Read From table links
const getLinks = (req,res)=>{
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    });
}
//UPDATE LINKS
const updateLink = (req,res)=>{
    const id = parseInt(req.params.id);
    const {name, url} = req.body;

    pool.query('UPDATE links SET name = $1, url = $2 WHERE id = $3',[name, url, id], (error, results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`Link with ID: ${id} was succesfully updated.`)
    });
}
//DELETE A LINK
const deleteLink = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM links WHERE id = $1',[id], (error, results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`Link ${id} successfully removed.`)
    });
}
//Export functions

module.exports ={
    getLinks,
    createLink,
    updateLink,
    deleteLink
}
