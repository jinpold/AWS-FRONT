import { createAsyncThunk } from "@reduxjs/toolkit";
import { countUsersAPI, deleteUserByIdAPI, existsByUsernameAPI, fetchAllUsersAPI, findUserByIdAPI, joinUserAPI, loginUserAPI, logoutAPI, modifyUserByIdAPI } from "./user.api";
import { IUser } from "../model/user.model";

export const fetchAllUsers: any = createAsyncThunk(
    'users/fetchAllUsers',
    async (page: number) => await fetchAllUsersAPI(1)
)

export const findUserById: any = createAsyncThunk(
    'users/findUserById',
    async (id: number) => await findUserByIdAPI(id)
)

export const findCountUsers: any = createAsyncThunk(
    'users/countAllUsers',
    async () => await countUsersAPI()
)

export const modifyUserById: any = createAsyncThunk(
    'users/modifyUserById',
    async (user: IUser) => await modifyUserByIdAPI(user)
)

export const deleteUserById: any = createAsyncThunk(
    'users/deleteUserById',
    async (id: number) => await deleteUserByIdAPI(id)
)

export const loginUser: any = createAsyncThunk(
    'users/loginUser',
    async (props: IUser) => await loginUserAPI(props)
)

export const joinUser: any = createAsyncThunk(
    'users/joinUser',
    async (props: IUser) => await joinUserAPI(props)
)

export const existsByUsername:any = createAsyncThunk(
    'users/existsByUsername',
    async (username: string) => await existsByUsernameAPI(username)
)

export const logout:any = createAsyncThunk(
    'users/logout',
    async () => await logoutAPI()
)