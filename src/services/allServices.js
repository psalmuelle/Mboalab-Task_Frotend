
import axios from "axios";


function authHeader() {
    const token = JSON.parse(localStorage.getItem("token"));
  
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else return {};
  }
  

const client = axios.create({
    baseURL: "https://daniel2345.pythonanywhere.com/api",
  
  
  })



const register=(data)=>{
    return (
        client
      .post("/register/", {
        username: data.username,
        email: data.email,
        password: data.password

      }).then((response)=>{        
        response.data?.user_info && localStorage.setItem("user", JSON.stringify(response.data.user_info))
       

        response.data?.token && localStorage.setItem("token", JSON.stringify(response.data.token))
      }).catch(err =>{
        console.log(err)
        alert(JSON.stringify(err.response.data))
      })
    )
}

const login=(data)=>{
 
    return (
        client
      .post("/login/", {
        username: data.username,
        password: data.password

      }).then((response)=>{       
          response.data?.user_info && localStorage.setItem("user", JSON.stringify(response.data.user_info))
          console.log(response)
  
          response.data?.token && localStorage.setItem("token", JSON.stringify(response.data.token))
        }).catch(err =>{
          console.log(err)
          alert(JSON.stringify(err.response.data))
        })
      )
}

const getUser=()=>{
return (
    client
    .get("/user/", {
        headers: authHeader()
    })
)
}

const logout=()=>{
    return (
        client
        .get("/logout/", {
            headers: authHeader()
        })
        .then(res=>{
            alert(res.data)
            localStorage.clear()
        })
        .catch((err)=>{
            console.log(err)
        })
    )
    }


    //Hospital Data

    const createHospitalData=(data)=>{
        return (
            client
          .post("/hospital/create/", data,

          {
            headers: authHeader()
          })
          .then((response)=>{
            console.log(response.data)
            window.location.assign('/')
          }).catch(err =>{
            console.log(err)
            alert(err)
          })
        )
    }

    const getHospitalData=()=>{
        return (
            client
          .get("/hospital/get/", {
            headers: authHeader()
          })
         
        )
    }


export default{
    register,
    login,
    getUser,
    logout,
    createHospitalData,
    getHospitalData,
};
