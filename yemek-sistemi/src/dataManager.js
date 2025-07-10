import {url} from "../App";

export let DATA = []

export async function getData() {

    return new Promise((resolve)=>{
        fetch(url+"data/gets",{method:"POST"})
            .then((response) => {
                if (response.status!=200) {
                    throw new Error("Veri alınırken hata oluştu");
                }
                return response.json();
            })
            .then((json) => {
                if(!json.success || !json.result){
                    throw new Error("Veri alınırken hata oluştu");
                    return
                }

                DATA = [...json.result]

                resolve(DATA)

            })
            .catch((error) => {
                console.error("Hata:", error)
                resolve([])
            });
    })
}

async function saveData(data) {

    return new Promise((resolve)=>{
        fetch(url+"data/put",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data})})
            .then((response) => {
                if (response.status!=200) {
                    throw new Error("Veri alınırken hata oluştu");
                }
                return response.json();
            })
            .then((json) => {
                if(!json.success || !json.result){
                    throw new Error("Veri alınırken hata oluştu");
                    return
                }
                resolve(data)
            })
            .catch((error) => {
                console.error("Hata:", error)
                resolve(false)
            });
    })
}


export async function addCustomer(customer) {

    const last_customer_id = DATA.length?Math.max(...DATA.map(e=>parseInt(e.id))):0
    DATA.push({id:isNaN(last_customer_id)?1:last_customer_id+1,name:customer.name,muscles:[]})
    return await saveData(DATA)
}

export async function removeCustomer(customer_id) {
    const index = DATA.findIndex(e=>e.id==customer_id)
    if(index!=-1)
        DATA.splice(index,1)
    return await saveData(DATA)
}
