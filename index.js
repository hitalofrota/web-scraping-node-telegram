const puppeteer = require("puppeteer");

console.log("O código está sendo executado!");

async function robo(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const futebol = `https://www.flashscore.com.br/futebol/brasil/serie-a/#/WGqehPkI/table/overall`
    await page.goto(futebol);

    setTimeout(async () => {
        const placar = await page.evaluate(() => {
            const elementos = Array.from(document.getElementsByClassName('event__score event__score--home'));
            return elementos.map(elemento => {
                return {
                    tituloDaPagina: elemento.textContent,
                    // Outros atributos ou informações desejadas
                };
            });
        });
        console.log("Placar Geral", placar)
        await browser.close();
    }, 5000);
    
    //isso faz com que o navegador tire um print da tela
    //await page.screenshot({path: 'example.png'});

    //isso faz com que o navegador seja fechado depois de toda operação
    //isso pode fazer com que o terminal fique impossibilitado de executar novos comandos
    
}


setInterval(robo, 10000); 
