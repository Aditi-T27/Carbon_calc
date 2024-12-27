//for user login
username=document.getElementById('username');
password=document.getElementById('password');
user_btn=document.getElementById('submit');
user_btn.addEventListener("click", () => {

window.location.href = `frontpage.html?username=${encodeURIComponent(username.value)}`;
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "user_name": username.value,
  "passcode": password.value
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/user", requestOptions)
  .then((response) => response.text())
  .then((result) => alert("Details added successfully"))
  .catch((error) => console.error(error));
  });
  
  //for building info

//   Bname=document.getElementById('b_name');
//   size=document.getElementById('size_sqft');
//   location=document.getElementById('location');
//   b_info_btn=document.getElementById('b_info');
//   b_info.addEventListener("click",()=>{
//      alert(Bname,size,location,username);
//   })