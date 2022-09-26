const { link } = require('fs');

const puppeteer = require('puppeteer'); //traerse libreria

//funcion autoejecutada

(async()=>{

    const browser = await puppeteer.launch({headless: false}); //obtener navegador

    const page = await browser.newPage();

    await page.goto('https://www.amazon.com');

    await page.screenshot({path: 'amazon1.jpg'});

    

    await page.type('#twotabsearchtextbox', 'libros javascript')

    await page.click('.nav-search-submit-text input')

    await page.waitForSelector('.a-section h2 a') //espera a que cargue selector

    await page.waitForTimeout(3000) //espera cierto tiempo para cargar pagina

    await page.screenshot({path: 'buscar3.jpg'});

    

    //listar url de busqueda

    const enlaces = await page.evaluate(()=>{ //busca la url de cada libro (a)

        const elements = document.querySelectorAll('.a-section h2 a');

        

        const links = []; //crear arrai vacio para links

        //recorre los links

        for(let element of elements) {

            links.push(element.href);

        }

        return links; //retorna los link de cada libro

    })

    console.log(enlaces.length);

    console.log(enlaces);

    const books = [] //crear array de libros

    for (let enlace of enlaces) {

        await page.goto(enlace);

        await page.waitForSelector('#productTitle');//esperar a que el selector este disponible

        //extraer info de cada libro

        const book = await page.evaluate(()=>{

            const tmp = {};

            tmp.title = document.querySelector('#productTitle').innerText;

            tmp.author = document.querySelector('.a-declarative a').innerText;

            return tmp; //retorna datos de autor y titulo de cada libro linkeado

        });

        books.push(book);

    }

    console.log(books)

    await browser.close();

    console.log("fin")

})();
