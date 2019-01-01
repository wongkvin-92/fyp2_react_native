var ncp = require('ncp').ncp;

ncp.limit = 16;

let src = "./common/android-icons/res/";
let dst = "./android/app/src/main/res/";
ncp(src,dst, function (err) {
     if (err) {
            return console.error(err);
             }
              console.log('done!');
});
