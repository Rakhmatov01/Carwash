import {create} from 'zustand';
import {persist} from "zustand/middleware";

export const useAuthjStore = create(persist((set)=>({
    accessToken:null,
    refreshToken : null,
    user : null,
    setTokens : ({accessToken , refreshToken})=>set({accessToken, refreshToken}),
    setUser : (user)=>set({user}),
    logout : ()=>set({accessToken:null, refreshToken:null, user:null}),

}), {name : "authTokens"}));