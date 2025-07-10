
const { put,list } = require("@vercel/blob");

const express = require('express');
const router = express.Router();


router.post('/gets', async function(req, res, next) {
    let result = null
    try{
        result = await list({mode:'folded',access: 'public' ,prefix:'exercises/'})
        const file_name = result.blobs.sort((x, y) => y.uploadedAt-x.uploadedAt)?.[0]?.url

        result = await new Promise((resolve, reject) => {
            fetch(file_name)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Veri alınırken hata oluştu");
                    }
                    return response.json();
                })
                .then((json) => {
                    resolve(json)
                })
                .catch((error) => {
                    reject(null)
                    console.error("Hata:", error)
                });
        })


    }catch (e) {
        console.error(e)
    }

    res.json({success:true,result});
});

router.post('/put', async function(req, res, next) {
    let {data} = req.body
    let result = null
    try{


        const { url } = await put('exercises/data.json', JSON.stringify(data), {access: 'public' });
        if(url)
            result = url

    }catch (e) {
        console.error(e)
    }

    res.json({success:true,result});
});

module.exports = router;
