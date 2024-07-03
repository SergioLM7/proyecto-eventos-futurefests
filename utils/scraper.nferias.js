const puppeteer = require("puppeteer");

const extractProductData = async (url,browser) => {
    try{
        const productData = {}
        const page = await browser.newPage()
        await page.goto(url)

        productData['event_name'] = await page.$eval("h1", name=>name.innerText)
        productData['date_start'] = await page.$eval('.dtstart', date_i=>date_i.innerText)
        productData['date_end'] = await page.$eval('.dtend', date_f=>date_f.innerText)
        productData['poster'] = await page.$eval(".logo", img=>img.src)
        productData['description'] = await page.$eval("article:nth-child(1) > p:nth-child(3)", info=>info.innerText)
        productData['url'] = url;

        await page.close();

        return productData 
    }
    catch(err){
       return {error:err}
    } 
}

const scrap = async (url) => {
    try {
        const scrapedData = []
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage();
        await page.goto(url);

        const tmpurls = await page.$$eval(".card-body a",data=>data.map(a=>a.href))
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

//scrap("https://www.nferias.com/tecnologia/espana/").then(data =>console.log(data))