const fs = require('fs');


async function short(input) { 
    
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
    for(i = 1650;  i < 1800; i++) {
        await short('/Users/teddyklausner/Downloads/aclImdb 2/train/unsup/' + i + '_0.txt');
    }
}

function parse(text) {
    var data = fs.readFileSync(text, 'utf8');
    var digests = [];
    
    while(data.length > 0) {
        
        // fix dig
        var dig = data.substring(0, data.indexOf('}'));
        dig = dig + ',' + data.substring(data.indexOf('}{') + 2, data.indexOf('}\n') + 1);
        dig = dig.substring(0, dig.indexOf('"file"') + 7) + '"' + dig.substring(dig.indexOf('"file"') + 7, dig.indexOf(',"time"')) + '"' + dig.substring(dig.indexOf(',"time"'));

        var obj;
        try {
        // parse text to json
            obj = JSON.parse(dig, function(key, value) {
                return value;
            });
            
            digests.push(obj);
            
        } catch(err) {
            console.log(err);
        }
        data = data.substring(data.indexOf('}\n') + 3);
    }
    
    //fs.appendFileSync('output2.txt', JSON.stringify(digests));
    
    return digests;
    }

// parse file into json objects
digests = parse('output.txt');


digests.forEach(dig => fs.appendFileSync('time.txt', dig.time + ' '));
    

//http://ai.stanford.edu/~amaas/data/sentiment/
