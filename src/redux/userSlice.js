import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        user_data: {},
        authenticated: false,
        

    },
    reducers: {
        checkAuthentication: (state)=>{  
        return (
                
           
            {...state, 
                user_data : JSON.parse(localStorage.getItem("user")), 
               token :JSON.parse(localStorage.getItem("token")),
                authenticated: true,
                
               
            }
           
        )

        },
        removeAuthentication: (state)=>{
            return (
                
           
                {...state, 
                    token: null,
                    user_data: {},
                   authenticated: false,
                   
                })
        }
    }
        
    
});


export const {checkAuthentication, removeAuthentication} = userSlice.actions

export default userSlice.reducer