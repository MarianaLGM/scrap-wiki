
//1.primero inciamos npm init -y  para crear el package.json. luego instalaremos las dependencias (express, axios y cheerio): npm i express axios cheerio -E
//2.Crear un Archivo `index.js`
//3.Crear un servidor http


const axios=require("axios")
const cheerio=require ("cheerio")
const express= require ("express")
const app= express()

const url="https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap"

// OPCIÓN 1
app.get("/", (req,res)=>{
    //res.send("FUNCIONA!!!!")
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
           // console.log(html)
           // res.send(html)  esto lo que hará es cargar todo el html

// Paso 5: Crea un array y dentro guarda cada uno de los datos de las páginas en un objeto (título, imagenes, textos)
            const nuevosDatos=[]


            $("#mw-pages a").each((index, element)=>{
            
              const texto=$(element).attr("href")
              const title=$(element).attr("title")
              const imgs=$(element).attr("src")
              nuevosDatos.push({
                texto:texto,
                title:title,
                imgs:imgs})//una vez que lo tenemos vamos a pushearlo
          })

        $("img").each((index, element)=>{//cheerio tiene una opcion para recorrer las imagenes
           console.log(element)
        })
    
    res.send(nuevosDatos)
    
    
    }
    })
    
})

/*
// OPCIÓN 2
app.get("/", (req,res)=>{
    //res.send("FUNCIONA!!!!")
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
           // console.log(html)
           // res.send(html)  esto lo que hará es cargar todo el html

// Paso 5: Crea un array y dentro guarda cada uno de los datos de las páginas en un objeto (título, imagenes, textos)
            const rapero=[
                titulo:
                imagenes:
                textos:
                

        const titulo=$("title").text()
        $("#mw-pages a").each((index, element)=>{//cheerio tiene una opcion para recorrer las imagenes
              const enlace=$(element).attr("href")
              textos.push(enlace)//una vez que lo tenemos vamos a pushearlo
        })
      
        $("img").each((index, element)=>{//cheerio tiene una opcion para recorrer las imagenes
            const imagen=$(element).attr("src")
            imagenes.push(imagen)//una vez que lo tenemos vamos a pushearlo
        })
          
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body>
    <h1>${titulo}</h1>
        <ul>
          ${textos.map(enlace=>`<li>${enlace}</li>`).join("")}
        </ul>
        <h2>Imágenes</h2>
        <ul>
        ${imgenes.map(imgen=>`<li><a href="${url}${imgen}>${imgen}</a></li>`).join("")}
        </ul>
    </body>
    </html> 
       `
        )
    }
    })
    
})
*/
app.listen(3000, ()=>{
    console.log("express está escuchando en el puerto http://localhost:3000")
})
