const fs = require('fs');
const qs = require('qs');
let Model = require('../model/model');


class Controller {
    constructor() {
        this.model = new Model();
    }

    readPage(pathname) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathname, 'utf-8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    getListCity() {
        return new Promise((resolve, reject) => {
            this.model.getListCityDB().then(result => {
                let html = '';
                result.forEach((value, index) => {
                    html += `<tr>`
                    html += `<td>${index + 1}</td>`
                    html += `<td>${value.name}</td>`
                    html += `<td>${value.country}</td>`
                    html += `<td><a href="/edit?id=${value.id}">Edit</a></td>`
                    html += `<td><a href="/delete?id=${value.id}">Delete</a></td>`
                    html += `</tr>`
                })
                resolve(html);
            })
        })
    }

    getCityInfo(id) {
        return new Promise((resolve, reject) => {
            this.model.getCityInfoDB(id).then(result => {
                resolve(result);
            })
        })
    }

    deleteCity(id) {
        return new Promise((resolve, reject) => {
            this.model.deleteCityDB(id).then(() => {
                resolve();
            });
        })
    }

    addNewCity(name, country, area, population, gdq) {
        return new Promise((resolve, reject) => {
            this.model.addNewCityDB(name, country, area, population, gdq).then(() => {
                resolve();
            })
        })
    }
    setCityInfo(id,name,country,area,population,gdp){
        return new Promise((resolve, reject) =>{
            this.model.setCityInfoDB(id,name,country,area,population,gdp).then(()=>{
                resolve();
            }).catch(err=>{
                console.log(err);
                reject(err);
            })
        })
    }
}

module.exports = Controller;