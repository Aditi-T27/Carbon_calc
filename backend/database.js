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

//post method For building info values
export async function createrow(building_name,size_sqft,location,user){
 const result=await pool.query(
    `INSERT INTO building_info(building_name,size_sqft,location,user)
    VALUES(?,?,?,?)`,[building_name,size_sqft,location,user]
 )
 return result
}

//post method For user values
// export async function user(user_name,passcode){

//  const result=await pool.query(
//     `INSERT INTO user(username,passcode)
//     VALUES(?,?)`,[user_name,passcode]
//  )
//  return result
// }

export async function user(user_name, passcode) {
    try {
        // Check if the username already exists
        const checkQuery = `SELECT COUNT(*) AS count FROM user WHERE username = ?`;
        const [rows] = await pool.query(checkQuery, [user_name]);
        
        if (rows[0].count > 0) {
            // Username already exists
            return { success: false, message: "Username already exists" };
        }

        // If the username doesn't exist, proceed with insertion
        const insertQuery = `INSERT INTO user (username, passcode) VALUES (?, ?)`;
        const [result] = await pool.query(insertQuery, [user_name, passcode]);

        return { success: true, message: "User created successfully", result };
    } catch (error) {
        // Handle errors (e.g., database connection issues)
        console.error("Database error:", error);
        return { success: false, message: "An error occurred", error };
    }
}
export async function getBuilding_userdata(username){
        try {
            // Query to fetch building names associated with the username
            const query = `
                SELECT b.building_name 
                FROM user u,building_info b where u.username=b.user and username=?
            `;
            
            // Execute the query
            const [rows] = await pool.query(query, [username]);
            
            if (rows.length === 0) {
                // No buildings found for the user
                return { success: false, message: "No buildings found for this user" };
            }
    
            // Extract building names
            const buildingNames = rows.map(row => row.building_name);
    
            return { success: true, buildings: buildingNames };
        } catch (error) {
            console.error("Database error:", error);
            return { success: false, message: "An error occurred while fetching data", error };
        }

    
    }
//get method for building features and their value
export async function getbuidlingfeature(building_name){
  const [result]=await pool.query(
    `Select b.feature_name,b.feature_value,e.result from building_features b ,result_emission e where  b.building_name=e.building_name and b.building_name=? `,[building_name])
    return result;
 }

//Post method For building Feature Values
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

//insert into emission_result table
export async function E_result(B_name,result){
    const res=await pool.query(
        `INSERT INTO result_emission(building_name,result)
        VALUES(?,?)`,[B_name,result]
     )
     return res;
}

//for email id and passcode:
 
export async function userdata(username){
    const res=
    await pool.query(`SELECT u.email, u.passcode from user u where username = ?`,[username])
    return res[0];
}

// const notes=await createrow('Commercial',7400,'Switzerland')

// const value=result()

// console.log(notes)