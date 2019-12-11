async function short(input) { 
    
    const fs = require('fs');
    const now = require('performance-now');
    
    var msg = '';
    var data = await fs.readFileSync(input, 'utf8');
    var t0 = now();
    // Require the short library with an API key.
    const short = require('@oppie/short')('7c99f806023f4ead9bd40b6ac2644969');
    
    // Create a new message containing the content to be condensed.
    try {
        process.stdout.write('#');
        msg = await short.digest({
            content: data
        });    
    }
    catch(err) {
        console.log(input.substring(input.indexOf('p/') + 2) + ': ' + err);
        return;
    }

    var t1 = now();    
    fs.appendFileSync('output.txt', JSON.stringify(msg) + '{"file":' + input.substring(input.indexOf('p/') + 2) + ',"time":' + (t1 - t0) + '}\n\n');
    
    return msg;
}

async function fetch() {
    //const siteUrl = 'https://www.gutenberg.org/files/' + id + '/' + id + '-h/'+ id + '-h.htm';
    const siteUrl = 'https://www.npr.org/2019/07/10/740387601/university-of-texas-austin-promises-free-tuition-for-low-income-students-in-2020'
    const axios = require('axios');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const fetchData = async () => {
        const result = await axios.get(siteUrl);
        return cheerio.load(result.data);
    };
    
    const $ = await fetchData();
    
    /*
    const lang = $('p:contains(Language: )').text() == 'Language: English';
        
    if(!lang) { 
        return false; 
    }
    */
    const text = $('p:contains(\n)');
        
    
     try {
        fs.writeFileSync('input.txt', text);
         return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function run() {
    var i;
    for(i = 1600;  i < 1800; i++) {
        await short('/Users/teddyklausner/Downloads/aclImdb 2/train/unsup/' + i + '_0.txt');
    }
}

run();

//short('/Users/teddyklausner/Downloads/aclImdb 2/train/unsup/422_0.txt');

//http://ai.stanford.edu/~amaas/data/sentiment/
