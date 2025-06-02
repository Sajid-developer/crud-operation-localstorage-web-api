console.log("App running successfully, No error.");

        console.log("Hello Sajid !");

        const netStatus=document.querySelector(".networkStatus");

        window.addEventListener("online",()=>{
            netStatus.innerText="You are Online :)";
            netStatus.style.background="green";
            netStatus.classList.add("active");
            setTimeout(()=>{
                netStatus.classList.remove("active");
            },4000);
        });

        window.addEventListener("offline",()=>{
            netStatus.innerText="You are Offline :(";
            netStatus.style.backgroundColor="red";
            netStatus.classList.add("active");
            setTimeout(()=>{
                netStatus.classList.remove("active");
            },4000);
        });


        // code to switch between dark & light modes ✅

        const themeMode=document.querySelector('.theme-mode');
        let darkMode=localStorage.getItem("darkMode");

        const enableDarkMode=()=>{
           localStorage.setItem("darkMode", "active");
           document.body.classList.add("darkMode");
           themeMode.innerText="Light Mode";
        }

        const disableDarkMode=()=>{
           localStorage.setItem("darkMode", null);
           document.body.classList.remove("darkMode");
           themeMode.innerText="Dark Mode";
        }

        const disableColorTheme=()=>{
            document.body.classList.remove("crimson-theme");
            document.body.classList.remove("orange-theme");
            document.body.classList.remove("blue-theme");
        }

        if(darkMode === "active"){
            enableDarkMode();
        }

        themeMode.addEventListener("click", ()=>{
           disableColorTheme();
           darkMode=localStorage.getItem("darkMode");
           darkMode!== "active" ? enableDarkMode() : disableDarkMode();
        });


        // code to switch between different color themes ✅

        const themeBtns=document.querySelectorAll(".theme-box .colors");
        
        themeBtns.forEach((btn)=>{
           btn.addEventListener("click", ()=>{
             document.querySelector("button.active").classList.remove("active");
             btn.classList.add("active");

             if(btn.id == "blue"){
                document.body.classList.remove("crimson-theme");
                document.body.classList.remove("orange-theme");
                document.body.classList.add("blue-theme");
             }
             else if(btn.id == "crimson"){
                document.body.classList.remove("blue-theme");
                document.body.classList.remove("orange-theme");
                document.body.classList.add("crimson-theme");
             }
             else{
                document.body.classList.remove("blue-theme");
                document.body.classList.remove("crimson-theme");
                document.body.classList.add("orange-theme");
             }
           });
        });


        // code to store user data on browser using localStorage Web API and display on the feed ✅

        const form=document.querySelector("form.register-form");
        const userContainer=document.querySelector(".user-container");   
          
        let userData;

        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            userData=JSON.parse(localStorage.getItem("userInfo")) ?? [];
            
            let userID='';
            let string='234567891';
            for(let i=0; i<7; i++){
               let randChar=Math.floor(Math.random()*string.length);
               userID+=string[randChar];
            }
            console.log(userID);


            let userName=event.target.uname.value.trim();
            let userEmail=event.target.email.value.trim();
            let userPhone=event.target.phone.value;
            let userAddress=event.target.address.value.trim();

            let userExist=false;

            for(let user of userData){
                if(user.email==userEmail || user.phone==userPhone){
                    userExist=true;
                    break;
                }
             }


              if(userExist){
                 alert("User already exists 🚫");
               }
               else{
                 let userInfo={
                    "id": userID,
                    "name": userName,
                    "email": userEmail,
                    "phone": userPhone,
                    "address": userAddress,
                   }

                 userData.push(userInfo);
                 localStorage.setItem("userInfo",JSON.stringify(userData));
                 event.target.reset();
                }

               DisplayUserData();
           });


         
        function DisplayUserData(){
           userData=JSON.parse(localStorage.getItem("userInfo")) ?? [];
           let users=`<div class="userHeader">
                <h2>Total Users: ${userData.length}</h2>
    
                <form action="" method="POST" class="update-form" name="update" style='display:none;'>
    
                    <input type="text" name="userId" id="user" hidden>

                    <label for="uname">Name: </label>
                    <input type="text" name="uname" id="uname" required autocomplete="off">
        
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email" required autocomplete="off">
        
                    <label for="phone">Phone: </label>
                    <input type="text" name="phone" id="phone" maxlength="10" required autocomplete="off">
        
                    <label for="address">Address: </label>
                    <input type="text" name="address" id="address" required autocomplete="off">
        
                    <button type="submit">Update</button>
                </form>
            </div>`;

           userData.forEach((user,i) =>{
            users+=`
                <div class="user-card">
                   <button class='editButton' onclick='EditUser(${user.id})'>Edit</button>
                   <span title='Delete User' onclick='DeleteUserData(${i})'>&times;</span>

                   <label>Name</label>
                   <p>${user.name}</p>

                   <label>Email</label>
                   <p>${user.email}</p>

                   <label>Phone</label>
                   <p>${user.phone}</p>

                   <label>Address</label>
                   <p>${user.address}</p>
                 </div>`;
            
           });

           userContainer.innerHTML= users;
           console.log("Total users: " +userData.length);
        }

        DisplayUserData();
        
        const updateForm=document.querySelector('form.update-form');

        updateForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            userData=JSON.parse(localStorage.getItem("userInfo"));

            let USER_ID=e.target.userId.value;
            let name=e.target.uname.value.trim();
            let email=e.target.email.value.trim();
            let phone=e.target.phone.value;
            let address=e.target.address.value.trim();

            UpdateUserData(USER_ID,name,email,phone,address);

                }

           );
        
        function EditUser(uId){
            updateForm.style.display='block';
            userData=JSON.parse(localStorage.getItem("userInfo"));

            let data=userData.find(user => user.id == uId);
            console.log(data);

            updateForm.userId.value=data.id;
            updateForm.uname.value=data.name;
            updateForm.email.value=data.email;
            updateForm.phone.value=data.phone;
            updateForm.address.value=data.address;

        }

        function UpdateUserData(id,name,email,phone,address){            
            let userIndex=userData.findIndex(user => user.id == id);
            userData[userIndex] = {id, name, email, phone, address};

            localStorage.setItem("userInfo",JSON.stringify(userData));
            console.warn(id);

            updateForm.style.display='none';

            window.location.reload();
            
            DisplayUserData();
        }

        function DeleteUserData(index){
            userData=JSON.parse(localStorage.getItem("userInfo")) ?? [];

            let response=confirm("Do you really want to delete this user 🚫");
            if(response){
                userData.splice(index,1);
                console.log(userData);
                localStorage.setItem("userInfo",JSON.stringify(userData));
                DisplayUserData();
            }
        }


        // code to search specific user ✅

        // const searchBox=document.querySelector(".user-container .searchBox .searchInput");
        // const searchBtn=document.querySelector(".user-container .searchBox .searchBtn");

        // console.log(searchBox);
        // console.log(searchBtn);

        //  searchBtn.addEventListener("click", ()=>{
        //      let searchInput=searchBox.value.trim('');
        //      if(!searchInput) return;

        //      SearchUsers(searchInput);
        //      searchBox.value='';
        //      searchBox.focus();
        // });