/**const fs=require('fs')
const http=require("http");
  
fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot Open File");
        return
    }
 
    const jsonData=JSON.parse(data);
    const filteredData=jsonData.filter((user)=>user.amount>1500);
    fs.writeFile("./data.json",JSON.stringify(filteredData),(err)=>{
        if(err){
          console.log("Error Writing File");
          return;
        }
    });
});**/

const fs = require('fs');

const create = (student) => {
    fs.readFile('./student.json', 'utf8', (error, data) => {
        let students = data ? JSON.parse(data) : [];
        students.push(student);

        fs.writeFile('./student.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.log("Error occurred while writing the file:", err);
            } else {
                console.log("Student added successfully.");
            }
        });
    });
};