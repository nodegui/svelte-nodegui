let svg2png = require('convert-svg-to-png');
let fs = require('fs');

let icon_sizes = [
    {
        size: [24,24],
        path: (f) => `./app/App_resources/iOS/${f}.png`
    },
    {
        size: [48,48],
        path: (f) => `./app/App_resources/iOS/${f}@2x.png`
    },
    {
        size: [72,72],
        path: (f) => `./app/App_resources/iOS/${f}@3x.png`
    },
    {
        size: [32,32],
        path: (f) => `./app/App_resources/Android/src/main/res/drawable-mdpi/${f}.png`
    },
    {
        size: [48,48],
        path: (f) => `./app/App_resources/Android/src/main/res/drawable-hdpi/${f}.png`
    },
    {
        size: [64,64],
        path: (f) => `./app/App_resources/Android/src/main/res/drawable-xhdpi/${f}.png`
    },
    {
        size: [96,96],
        path: (f) => `./app/App_resources/Android/src/main/res/drawable-xxhdpi/${f}.png`
    },
    {
        size: [128,128],
        path: (f) => `./app/App_resources/Android/src/main/res/drawable-xxxhdpi/${f}.png`
    }
]

for (let f of fs.readdirSync('./assets/icons')) {
    console.log("found "+f);
    if (f.endsWith('.svg')) {
        for (let transform of icon_sizes) {
            let outFile = transform.path(f.replace(/\.svg$/i, ''));
            svg2png.convertFile(`./assets/icons/${f}`,
            {
                width: transform.size[0],
                height: transform.size[1],
                outputFilePath: outFile
            })
            console.log(`Created ${outFile}`);
        }
    }
}