const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

const getArgs = require('./getArgs');

const args = getArgs();

const heic_folder = args.heic_folder;

if (!fs.existsSync(args.output_folder)){
    fs.mkdirSync(args.output_folder);
}

fs.readdir(heic_folder, (err, files) => {
    files.forEach(file => {
        
        (async () => {
            console.log(file)
            const inputBuffer = await promisify(fs.readFile)(heic_folder+file);
            const outputBuffer = await convert({
                buffer: inputBuffer, // the HEIC file buffer
                format: 'JPEG',      // output format
                quality: 1           // the jpeg compression quality, between 0 and 1
            });

            await promisify(fs.writeFile)(args.output_folder + file + '.jpg', outputBuffer);
        })()

    });
})


