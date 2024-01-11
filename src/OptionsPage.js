// src/OptionsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import fs from 'fs';

async function getUser() {
  try {
    const response = await axios.get('http://localhost:5000/articulos');
    console.log(response);

    const { writeFileSync } = require('fs');

const path = './codigos.json';
const config = response;

try {
  writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
  console.log('Data successfully saved to disk');
} catch (error) {
  console.log('An error has occurred ', error);
}


    //response.
  } catch (error) {
    console.error(error);
  }
}

getUser();

const ob1 = [
  {
    "ArticuloDetalle": "200200",
    "PrecioUnitario": 2,
    "Descripcion": "ADULTO DAMA                $ 2.00",
    "Articulo": "P020",
    "CodigoBarra": "GP280700523",
    "EmpresaDestino": "carisma",
    "Cantidad": 101
  },
  {
    "ArticuloDetalle": "440200",
    "PrecioUnitario": 2,
    "Descripcion": "ADULTO DAMA                $ 2.00",
    "Articulo": "P020",
    "CodigoBarra": "GP280700523",
    "EmpresaDestino": "cany",
    "Cantidad": 19
  },
  {
    "ArticuloDetalle": "210500",
    "PrecioUnitario": 5,
    "Descripcion": "HOMBRE                  $ 5.00",
    "Articulo": "P097",
    "CodigoBarra": "NP280700623",
    "EmpresaDestino": "cany",
    "Cantidad": 49
  },
  {
    "ArticuloDetalle": "420500",
    "PrecioUnitario": 5,
    "Descripcion": "HOMBRE                  $ 5.00",
    "Articulo": "P097",
    "CodigoBarra": "NP280700623",
    "EmpresaDestino": "cany",
    "Cantidad": 11
  },
  {
    "ArticuloDetalle": "200200",
    "PrecioUnitario": 2,
    "Descripcion": "ADULTO DAMA                $ 2.00",
    "Articulo": "P020",
    "CodigoBarra": "WP280702223",
    "EmpresaDestino": "nyc",
    "Cantidad": 97
  },
  {
    "ArticuloDetalle": "440200",
    "PrecioUnitario": 2,
    "Descripcion": "ADULTO DAMA                $ 2.00",
    "Articulo": "P020",
    "CodigoBarra": "WP280702223",
    "EmpresaDestino": "cany",
    "Cantidad": 23
  },
  {
    "ArticuloDetalle": "430400",
    "PrecioUnitario": 4,
    "Descripcion": "JEAN DAMA PREMIUN",
    "Articulo": "P717",
    "CodigoBarra": "UP280705523",
    "EmpresaDestino": "cany",
    "Cantidad": 25
  }];


//const data2 = fs.readFileSync("./src/data.json");

const SearchBarFilter = () =>{
  const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState(ob1);


const handleInputChange = (event) =>{
const {value} = event.target;
setSearchTerm(value);
filterData(value);
};

const filterData = (searchTerm) =>{
  const filteredData = ob1.filter((item) =>
  item.EmpresaDestino.toLowerCase().includes(searchTerm.toLowerCase())
  );
setFilteredData(filteredData);
};

return(
  <div>
    <input type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={handleInputChange}/>


    <ul>
      {filteredData.map((item) =>
      (
        <li key={item.Descripcion}>
          {item.EmpresaDestino}</li>
      ))}
    </ul>
  </div>
);
};

export default SearchBarFilter;