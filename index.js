
//1.primero inciamos npm init -y  para crear el package.json. luego instalaremos las dependencias (express, axios y cheerio): npm i express axios cheerio -E
//2.Crear un Archivo `index.js`
//3.Crear un servidor http


const axios=require("axios")
const cheerio=require ("cheerio")
const express= require ("express")
const app= express()

const url="https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap"


app.get("/", (req,res)=>{
    //res.send("FUNCIONA!!!!")
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
           // console.log(html)
           // res.send(html)  esto lo que hará es cargar todo el html

//Crea un array y dentro guarda cada uno de los datos de las páginas en un objeto (título, imagenes, textos)
            let nuevosDatos=[]

            $("#mw-pages a").each((index, element)=>{
              const texto=$(element).attr("href")
              const title=$(element).attr("title")
              const urlRapero=`https://es.wikipedia.org/${texto}`

             /* const nuevosDatos=axios.get(urlRapero).then((response)=>{
                const $$= cheerio.load(response.data);
                const img=$$("a.mw-file-description img").attr("src")*/

                nuevosDatos.push({
                    texto:urlRapero,
                    title:title,
                    //imgs:img,
                    })      
                })   
                res.send(nuevosDatos)
            //})         
     }
    


})
})
app.listen(3000, ()=>{
    console.log("express está escuchando en el puerto http://localhost:3000")
})

