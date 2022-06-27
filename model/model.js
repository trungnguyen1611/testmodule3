let Database=require("./database")

class Model {
    constructor() {
        this.connect = Database.connect(err => {
            if (err) console.log(err);
            else console.log('connect success');
        })
    }

    getListCityDB(){
        return new Promise((resolve, reject) => {
            let sql=`select * from city`
            this.connect.query(sql,(err,data)=>{
                if(err) reject(err);
                resolve(data);
            })
        })
    }

    getCityInfoDB(id){
        return new Promise((resolve, reject) =>{
            let sql=`select * from city where city.id='${id}'`
            this.connect.query(sql,(err,data)=>{
                if(err) reject(err)
                resolve(data);
            })
        })
    }

    setCityInfoDB(id,name,country,area,population,gdp){
        return new Promise((resolve, reject) =>{
            let sql=`update city set city.name='${name}',city.country='${country}',city.area=${area},city.population=${population},city.gdp=${gdp}
                        where city.id=${id}`
            this.connect.query(sql,(err,data)=>{
                if(err) reject(err)
                resolve(data);
            })
        })
    }

    addNewCityDB(name,country,area,population,gdp){
        return new Promise((resolve, reject) => {
            let sql=`insert into city(name,country,area,population,gdp) 
                    values('${name}','${country}',${area},${population},${gdp})`
            this.connect.query(sql,(err,data)=>{
                if(err) reject(err);
                resolve(data);
            })
        })
    }

    deleteCityDB(id){
        return new Promise((resolve, reject) => {
            let sql=`delete from city where city.id=${id}`
            this.connect.query(sql,(err,data)=>{
                if(err) reject(err);
                resolve(data);
            })
        })
    }
}
module.exports = Model;