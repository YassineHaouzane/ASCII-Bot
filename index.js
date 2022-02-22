const Jimp = require('jimp');
const MAX_DISCORD_CHARS = 1990;

function luminance(rgb_info) {
    return 0.2126 * rgb_info.r + 0.7152 * rgb_info.g + 0.0722 * rgb_info.b;
}

//https://stackoverflow.com/questions/20314839/resize-image-to-approximate-number-of-pixels
function resizer(image) {
    const height = image.bitmap.height;
    const width = image.bitmap.width;
    const h = Math.sqrt(MAX_DISCORD_CHARS / (width * (height / 2)));
    const new_width = Math.floor(h * width);
    const new_height = Math.floor(h * height);
    image.resize(new_width, new_height);
    console.log(image.bitmap.height);
    console.log(image.bitmap.width);
}

const ascii =  ' .:-=+*#%@'; 
const asciiLength = ascii.length;
const getCharFromLuminance = luminance => ascii[Math.ceil((asciiLength - 1) * luminance / 255)];

// Moyenne de blocks de pixels

async function url_image_to_ascii(url) {
    let img_promise = Jimp.read(url);
    return img_promise.then(function (image) {
        resizer(image);
        const height = image.bitmap.height;
        const width = image.bitmap.width;
        const line_length = width + 1;
        let current_length = 0;
        let result = '';
        // https://minapecheux.com/website/2021/05/05/doing-networked-video-ascii-art-in-python/
        // Why height / 2
        for (let y = 0; y < height / 2 ; y++) {
            let s = '';
            if (current_length + line_length < MAX_DISCORD_CHARS) {
                for (let x = 0; x < width; x++) {
                    const rgb_info = Jimp.intToRGBA(image.getPixelColor(x, y * 2));
                    const luminance_value = luminance(rgb_info);
                    const c = getCharFromLuminance(luminance_value);
                    s += c;
                }
                result += s + '\n';
                current_length += line_length;
            }
        }
        console.log(result);
        return result;
    });
}

module.exports = {
    url_image_to_ascii: url_image_to_ascii
}
