val1=document.getElementById('feature_value1');
val2=document.getElementById('feature_value2');
val3=document.getElementById('feature_value3');
val4=document.getElementById('feature_value4');
val5=document.getElementById('feature_value5');
val6=document.getElementById('feature_value6');
val7=document.getElementById('feature_value7');
val8=document.getElementById('feature_value8');
val9=document.getElementById('feature_value9');
val10=document.getElementById('feature_value10');

// Bname=document.getElementById('building_name');
//Submit Buttons
s1=document.getElementById('submit1')
s2=document.getElementById('submit2')
s3=document.getElementById('submit3')
s4=document.getElementById('submit4')
s5=document.getElementById('submit5')
s6=document.getElementById('submit6')
s7=document.getElementById('submit7')
s8=document.getElementById('submit8')
s9=document.getElementById('submit9')

s10=document.getElementById('submit10')

// The result part
calculate=document.getElementById('calculate')
Result=document.getElementById('result');

//Receiving Building_name via Query Parameter
const params = new URLSearchParams(window.location.search);
const Bname = params.get('Bname'); // Use 'name' consistently
alert(Bname);

// Get the label element by its 'data-name' attribute
const label1 = document.querySelector('label[data-name="Cement"]');
// Get the value of the 'data-name' attribute
const label_N1 = label1.getAttribute('data-name');


const label2 = document.querySelector('label[data-name="Concrete"]');
// Get the value of the 'data-name' attribute
const label_N2 = label2.getAttribute('data-name');


const label3 = document.querySelector('label[data-name="Steel"]');
// Get the value of the 'data-name' attribute
const label_N3 = label3.getAttribute('data-name');

const label4 = document.querySelector('label[data-name="Wood"]');
// Get the value of the 'data-name' attribute
const label_N4 = label4.getAttribute('data-name');

const label5 = document.querySelector('label[data-name="Brick"]');
// Get the value of the 'data-name' attribute
const label_N5 = label5.getAttribute('data-name');


const label6 = document.querySelector('label[data-name="Glass"]');
// Get the value of the 'data-name' attribute
const label_N6 = label6.getAttribute('data-name');

const label7 = document.querySelector('label[data-name="Aluminum"]');
// Get the value of the 'data-name' attribute
const label_N7 = label7.getAttribute('data-name');

const label8 = document.querySelector('label[data-name="Fiberglass Insulation"]');
// Get the value of the 'data-name' attribute
const label_N8 = label8.getAttribute('data-name');

const label9 = document.querySelector('label[data-name="Polyurethane Insulation"]');
// Get the value of the 'data-name' attribute
const label_N9 = label9.getAttribute('data-name');

const label10 = document.querySelector('label[data-name="Plaster"]');
// Get the value of the 'data-name' attribute
const label_N10 = label10.getAttribute('data-name');



alert(label_N9);  // Output: "b_name"


// s1.addEventListener("click",()=>{
//   alert(label);
//     m_val=val.value;
//     m_name=Bname;
   
//     const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "name": m_name,
//   "val": m_val
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3000/insertf1", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
// })



s1.addEventListener("click",()=>{
    m_val=val1.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N1,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s2.addEventListener("click",()=>{
    m_val=val2.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N2,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s3.addEventListener("click",()=>{
    m_val=val3.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N3,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s4.addEventListener("click",()=>{
    m_val=val4.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N4,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s5.addEventListener("click",()=>{
    m_val=val5.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N5,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s6.addEventListener("click",()=>{
    m_val=val6.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N6,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s7.addEventListener("click",()=>{
    m_val=val7.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N7,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s8.addEventListener("click",()=>{
    m_val=val8.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N8,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s9.addEventListener("click",()=>{
    m_val=val9.value;
    m_name=Bname;
    const label_N1 = label1.getAttribute('data-name');


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N9,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})


s10.addEventListener("click",()=>{
    m_val=val10.value;
    m_name=Bname;
    console.log(m_name);


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name":m_name ,
  "feature":label_N10,
  "val":m_val 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/insertfeature", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

})



// calculate.addEventListener("click",()=>{
//   m_name=Bname;
     
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "name": Bname
// });
// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3000/result/${name}", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log("from ft"+result))
//   .catch((error) => console.error(error));
// })


calculate.addEventListener("click", () => {
  const m_name = Bname; // Get the input value

  if (!m_name) {
    alert("Please provide a valid name!");
    return;
  }

  // Construct the URL dynamically
  const url = `http://localhost:3000/result/${encodeURIComponent(m_name)}`;

  // Request options (no body for GET requests)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  // Fetch the data
//   fetch(url, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//       return response.text(); // or response.json() if expecting JSON
//     })
//     .then((result) => {
//       console.log("From Fetch:", result);
//       // Optionally display the result in the UI
//       document.getElementById('result').innerText = result;
//     })
//     .catch((error) => console.error("Fetch Error:", error));
// });

fetch(url, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json(); // Parse response as JSON
  })
  .then((result) => {
    console.log("From Fetch:", result);
    // Extract total_emission value
    const totalEmission = result[0]?.total_emission || "N/A";
    // Format and display the result
    document.getElementById('result').innerText = `Total Emission: ${totalEmission}`;


    //fetch code
    
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

console.log("inside fetch")
const raw = JSON.stringify({
  "Bname": Bname,
  "emission_result": totalEmission
});

const reqopt = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/result", reqopt)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));



  })
  .catch((error) => console.error("Fetch Error:", error));
})