const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://www.allworkersunion.com'];
const corsOptionsDelegate = async (req, callback) => {
    let corsOptions = {
      credentals: true,
      allowedHeaders: 'Content-Type, Authorization',
    }
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    await callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);