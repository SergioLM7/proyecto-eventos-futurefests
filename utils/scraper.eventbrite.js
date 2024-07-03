const puppeteer = require("puppeteer");

const extractProductData = async (url, browser) => {
    try {
        const productData = {};
        const page = await browser.newPage();
        await page.goto(url);

        productData['event_name'] = await page.$eval("h1", name => name.innerText);
        const dateText = await page.$eval(".date-info__full-datetime", date => date.innerText);
        const dateParts = dateText.split(' - '); // Suponiendo que el formato es "fecha de inicio - fecha de fin"
        
        if (dateParts.length === 2) {
            productData['date_start'] = dateParts[0].trim();
            productData['date_end'] = dateParts[1].trim();
        } else {
            // Manejo de errores en caso de que el formato de la fecha no sea el esperado
            productData['date_start'] = "Fecha no disponible";
            productData['date_end'] = "Fecha no disponible";
        }

        productData['poster'] = await page.$eval('[data-testid="hero-image"] img', img => img.src);
        productData['description'] = await page.$eval(".summary strong", info => info.innerText);
        productData['url'] = url;

        
        await page.close();
        
        return productData;
    } catch (err) {
        return { error: err.toString() }; // Asegúrate de devolver el error como una cadena de texto
    }
};

const scrap = async (url) => {
    try {
        const scrapedData = []
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage();
        await page.goto(url);

        const tmpurls = await page.$$eval(".event-card .horizontal-event-card__column a",data=>data.map(a=>a.href))
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
        const urls2 = urls.slice(0, 5 );

        for(productLink in urls2){
            const product = await extractProductData(urls2[productLink],browser)
            scrapedData.push(product)
        }
        console.log(scrapedData)
        
        await browser.close()
        return scrapedData;
    } catch (err) {
        console.log("Error:", err);
    }
}

exports.scrap = scrap;

//scrap("https://www.eventbrite.es/d/spain/software-conference/").then(data =>console.log(data))