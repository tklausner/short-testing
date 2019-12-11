async function start() { //ADDED BY ME
    console.time()
    const API_KEY = '7c99f806023f4ead9bd40b6ac2644969';
    const fetch = require("node-fetch"); //ADDED BY ME

    try {
      const req = await fetch('https://short.oppie.io/api/digest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY
        },
        body: JSON.stringify({
          content: `Enlightenment is man's emergence from his self-imposed nonage. Nonage is the inability to use one's own understanding without another's guidance. This nonage is self-imposed if its cause lies not in lack of understanding but in indecision and lack of courage to use one's own mind without another's guidance. Dare to know! (Sapere aude.) "Have the courage to use your own understanding," is therefore the motto of the enlightenment.`
        })
      });

      const resBody = await req.json();

      console.log(resBody);
    } catch (err) {
      console.error(err);
    }
    console.timeEnd()
   // msg = get()
}
start() //ADDED BY ME
