import { registerPAge } from '../viewls/register.js';
import * as api from './api.js'

export const login = api.login;
export const register = api.register
export const logout = api.logout ;


export async function getAllAlbums () {
    return api.get('http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function createSong (data){
    return api.post('http://localhost:3030/data/albums' , data);
}

export async function detailsSong(id){
    return api.get('http://localhost:3030/data/albums/' + id);
}

export async function deleteSong (id){
    return api.del('http://localhost:3030/data/albums/' + id);
}

export async function editSong(id , data){
    return api.put('http://localhost:3030/data/albums/' + id , data);
}

export async function getById(id){
    return api.get('http://localhost:3030/data/albums/' + id);
}