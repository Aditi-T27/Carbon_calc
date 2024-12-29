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


// code for  house_info insert
export async function inserthouseinfo(building_name, house_num, family_size, user) {
    const result = await pool.query(
        `INSERT INTO house_info (building_name, house_num, family_size, user)
         VALUES (?, ?, ?, ?)`,
        [building_name, house_num, family_size, user]
    );
    return result;
}
// insert into house_features
export async function houseinfo_insertFeature(building_name, house_num, feature_name, feature_value) {
    const result = await pool.query(
        `INSERT INTO house_features (building_name, house_num, feature_name, feature_value)
         VALUES (?, ?, ?, ?)`,
        [building_name, house_num, feature_name, feature_value]
    );
    return result;
}

// code to update the values
export async function updatedata(value,Bname,feature){
    const result=await pool.query(`UPDATE building_features
SET feature_value = ?
WHERE building_name = ? AND feature_name = ?
` ,[value,Bname,feature])
return result;
}

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

 //sign-in function
export async function user(user_name, passcode) {
   
    try {
        // Check if the username already exists
        const checkQuery = `SELECT COUNT(*) AS count FROM user WHERE username = ?`;
        const [rows] = await pool.query(checkQuery, [user_name]);
        
        if (rows[0].count > 0) {
            // Username already exists
            return { success: true, message: "Username exists" };
        }
        else{
           return {success:false,message:"Please Sign Up"}
        }
    } catch (error) {
        // Handle errors (e.g., database connection issues)
        console.error("Database error:", error);
        return { success: false, message: "An error occurred", error };
    }
}
//sign-up function
export async function signup_User(username,password,email){
    try{
    const insertQuery = `INSERT INTO user (username,passcode,email) VALUES (?, ?, ?)`;
    const [result] = await pool.query(insertQuery, [username, password,email]);
    return { success: true, message: "User created successfully", result };
    }
    catch(error){
        console.error("Database error:", error);
        return { success: false, message: "An error occurred", error };
    }
}

export async function getBuilding_userdata(username){
        try {
            // Query to fetch building names associated with the username
            const query = `
            SELECT b.building_name 
            FROM user u
            JOIN building_info b ON u.username = b.user 
            WHERE u.username = ?
            UNION
            SELECT h.building_name
            FROM user u
            JOIN house_info h ON u.username = h.user 
            WHERE u.username = ?;
        `;
        
         // Replace with the actual username value
        const [rows] = await pool.query(query, [username, username]);
          
        
        // const query = `
            //     SELECT b.building_name 
            //     FROM user u,building_info b where u.username=b.user and username=?
            // `;
            
            // Execute the query
            // const [rows] = await pool.query(query, [username]);
            
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
    `SELECT b.feature_name, b.feature_value, e.result 
FROM building_features b
JOIN result_emission e ON b.building_name = e.building_name
WHERE b.building_name = ?
UNION
SELECT hf.feature_name, hf.feature_value, NULL AS result
FROM house_features hf
WHERE hf.building_name = ?;
`,[building_name,building_name])
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

export async function update_insert(username,Bname){
    const res=await pool.query('Select bf.feature_value from building_features bf,building_info bi where bi.building_name=bf.building_name and bi.user=? and bi.building_name=?',[username,Bname])
    return res;

}
export async function result(){
    const res=
    await pool.query(`SELECT SUM(bf.feature_value * fe.emission_coefficient) AS total_emission FROM building_features bf JOIN emission_factors fe ON bf.feature_name = fe.feature_name WHERE bf.building_name = 'Building A'`)
    console.log(res[0])
    return res[0];
}

// FEATURE OF HOUSES DATA
export async function Hresult(Bname, HouseNum) {
    const res = await pool.query(
        `SELECT SUM(hf.feature_value * fe.emission_coefficient) AS total_emission 
         FROM house_features hf 
         JOIN daily_emission_factors fe 
         ON hf.feature_name = fe.feature_name 
         WHERE hf.building_name = ? AND hf.house_num = ?`,
         [Bname,HouseNum]

    );

    console.log(res[0]); // Log the results
    return res[0][0];    // Return the first row (query result)
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



//=================================================================
// import mysql from 'mysql2'
// import dotenv from 'dotenv'

// // const pool=mysql.createPool({
// //     host: process.env.MYSQL_HOST,
// //     user: process.env.MYSQL_USER,
// //     password: process.env.MYSQL_PASSWORD,
// //     database: process.env.MYSQL_DATABASE
// // }).promise();

// const pool=mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'ADITI@MYSQL',
//     database: 'carbon_calc'
// }).promise();

// export async function getdata(){ 
// const result=await pool.query("SELECT * FROM  building_info")
// const rows=result[0]
// console.log(result);
// return rows
// }

// export async function getval(name){ 
// const result=await pool.query("SELECT * FROM  building_features where building_name = ?",[name])
// const rows=result[0]
// console.log(result);
// return rows
// }

// export async function getid(id){
//     const [row]=await pool.query(`SELECT * FROM building_info WHERE building_id  = ? `,[id])
//     return row[0]
// }

// //post method For building info values
// export async function createrow(building_name,size_sqft,location,user){
//  const result=await pool.query(
//     `INSERT INTO building_info(building_name,size_sqft,location,user)
//     VALUES(?,?,?,?)`,[building_name,size_sqft,location,user]
//  )
//  return result
// }

// //post method For user values
// // export async function user(user_name,passcode){

// //  const result=await pool.query(
// //     `INSERT INTO user(username,passcode)
// //     VALUES(?,?)`,[user_name,passcode]
// //  )
// //  return result
// // }

//  //sign-in function
// export async function user(user_name, passcode) {
   
//     try {
//         // Check if the username already exists
//         const checkQuery = `SELECT COUNT(*) AS count FROM user WHERE username = ?`;
//         const [rows] = await pool.query(checkQuery, [user_name]);
        
//         if (rows[0].count > 0) {
//             // Username already exists
//             return { success: true, message: "Username exists" };
//         }
//         else{
//            return {success:false,message:"Please Sign Up"}
//         }
//     } catch (error) {
//         // Handle errors (e.g., database connection issues)
//         console.error("Database error:", error);
//         return { success: false, message: "An error occurred", error };
//     }
// }
// //sign-up function
// export async function signup_User(username,password,email){
//     try{
//     const insertQuery = `INSERT INTO user (username,passcode,email) VALUES (?, ?, ?)`;
//     const [result] = await pool.query(insertQuery, [username, password,email]);
//     return { success: true, message: "User created successfully", result };
//     }
//     catch(error){
//         console.error("Database error:", error);
//         return { success: false, message: "An error occurred", error };
//     }
// }

// export async function getBuilding_userdata(username){
//         try {
//             // Query to fetch building names associated with the username
//             const query = `
//                 SELECT b.building_name 
//                 FROM user u,building_info b where u.username=b.user and username=?
//             `;
            
//             // Execute the query
//             const [rows] = await pool.query(query, [username]);
            
//             if (rows.length === 0) {
//                 // No buildings found for the user
//                 return { success: false, message: "No buildings found for this user" };
//             }
    
//             // Extract building names
//             const buildingNames = rows.map(row => row.building_name);
    
//             return { success: true, buildings: buildingNames };
//         } catch (error) {
//             console.error("Database error:", error);
//             return { success: false, message: "An error occurred while fetching data", error };
//         }

    
//     }
// //get method for building features and their value
// export async function getbuidlingfeature(building_name){
//   const [result]=await pool.query(
//     `Select b.feature_name,b.feature_value,e.result from building_features b ,result_emission e where  b.building_name=e.building_name and b.building_name=? `,[building_name])
//     return result;
//  }

// //Post method For building Feature Values
// export async function insertfeatureval(building_name,feature_name,feature_val){
//  const result=await pool.query(
//     `INSERT INTO building_features(building_name,feature_name,feature_value)
//     VALUES(?,?,?)`,[building_name,feature_name,feature_val]
//  )
//  return result
// }


// export async function result(){
//     const res=
//     await pool.query(`SELECT SUM(bf.feature_value * fe.emission_coefficient) AS total_emission FROM building_features bf JOIN emission_factors fe ON bf.feature_name = fe.feature_name WHERE bf.building_name = 'Building A'`)
//     console.log(res[0])
//     return res[0];
// }

// export async function Bresult(Bname){
//     const res=
//     await pool.query(`SELECT SUM(bf.feature_value * fe.emission_coefficient) AS total_emission FROM building_features bf JOIN emission_factors fe ON bf.feature_name = fe.feature_name WHERE bf.building_name = ?`,[Bname])
//     console.log(res[0])
//     return res[0];
// }

// //insert into emission_result table
// export async function E_result(B_name,result){
//     const res=await pool.query(
//         `INSERT INTO result_emission(building_name,result)
//         VALUES(?,?)`,[B_name,result]
//      )
//      return res;
// }

// //for email id and passcode:
 
// export async function userdata(username){
//     const res=
//     await pool.query(`SELECT u.email, u.passcode from user u where username = ?`,[username])
//     return res[0];
// }

// // const notes=await createrow('Commercial',7400,'Switzerland')

// // const value=result()

// // console.log(notes)