import mysql from 'mysql2'
import dotenv from 'dotenv'

// const pool=mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// }).promise();

const pool=mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ADITI@MYSQL',
    database: 'carbon_calc'
}).promise();

export async function getdata(){ 
const result=await pool.query("SELECT * FROM  building_info")
const rows=result[0]
console.log(result);
return rows
}
export async function getval(name){ 
const result=await pool.query("SELECT * FROM  building_features where building_name = ?",[name])
const rows=result[0]
console.log(result);
return rows
}

export async function getid(id){
    const [row]=await pool.query(`SELECT * FROM building_info WHERE building_id  = ? `,[id])
    return row[0]
}

export async function createrow(building_type,size_sqft,location){
 const result=await pool.query(
    `INSERT INTO building_info(building_type,size_sqft,location)
    VALUES(?,?,?)`,[building_name,size_sqft,location]
 )
 return result
}
export async function insertfeatureval(building_name,feature_name,feature_val){
 const result=await pool.query(
    `INSERT INTO building_features(building_name,feature_name,feature_value)
    VALUES(?,?,?)`,[building_name,feature_name,feature_val]
 )
 return result
}


export async function result(){
    const res=
    await pool.query(`SELECT SUM(bf.feature_value * fe.emission_coefficient) AS total_emission FROM building_features bf JOIN emission_factors fe ON bf.feature_name = fe.feature_name WHERE bf.building_name = 'Building A'`)
    console.log(res[0])
    return res[0];
}

export async function Bresult(Bname){
    const res=
    await pool.query(`SELECT SUM(bf.feature_value * fe.emission_coefficient) AS total_emission FROM building_features bf JOIN emission_factors fe ON bf.feature_name = fe.feature_name WHERE bf.building_name = ?`,[Bname])
    console.log(res[0])
    return res[0];
}
// const notes=await createrow('Commercial',7400,'Switzerland')

// const value=result()

// console.log(notes)