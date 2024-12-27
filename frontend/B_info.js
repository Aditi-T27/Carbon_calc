//   Bname=document.getElementById('b_name');
//   size=document.getElementById('size_sqft');
//   location=document.getElementById('location');
//   b_info_btn=document.getElementById('b_info');
//   b_info_btn.addEventListener("click",()=>{
//     // const params = new URLSearchParams(window.location.search);
//     // const name = params.get('username');


//     //  alert(username);
//     //  alert(Bname,size,location,username);
//   })

const b_info_btn = document.getElementById('b_info');


    const params = new URLSearchParams(window.location.search);
    const name = params.get('name'); // Match the parameter key

b_info_btn.addEventListener("click", () => {

    const Bname = document.getElementById('b_name').value;
    const size = document.getElementById('size_sqft').value;
    const location = document.getElementById('location').value;
    alert(`Building Name: ${Bname}, Size: ${size}, Location: ${location} ,name: ${name}`);
 
    //fetch API
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "building_name":Bname,
  "size_sqft": size,
  "location": location,
  "user": name
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/createrow", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  window.location.href = `db_buildingfeatures.html?Bname=${encodeURIComponent(Bname)}`;
});
