import axios from "axios";

const APIKEY:string = '6O6lmqXUfrC9ZAcaDhfnzgxoQQWGRPD6'

export async function getTrendingImages(imageType:string){

    const requestBody:any = {
        api_key:APIKEY,
        limit:20,
        offset:0
    }

    const params = new URLSearchParams(requestBody).toString();
    
    try {
        const response = await axios.get(`https://api.giphy.com/v1/${imageType}/trending?${params}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })

        console.log('res' , response)

        if(!response || !response.data){
            throw new Error(`HTTP request failed with status ${response?.status ?? ''}`);
        }
        
        if (response.status!== undefined &&
        response.status !== 200 &&
        response.status !== 201) {
        throw new Error(response.statusText);
        }
    
        return response.data;

        
    } catch (error) {
        console.log('Error >>>>>' , error)
    }



}

export async function getSearchResults(searchText:string , imageType:string){
    const requestBody:any = {
        api_key:APIKEY,
        q:searchText,
        limit:20,
        offset:0
    }

    const params = new URLSearchParams(requestBody).toString();
    
    try {
        const response = await axios.get(`https://api.giphy.com/v1/${imageType}/search?${params}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })

        console.log('res' , response)

        if(!response || !response.data){
            throw new Error(`HTTP request failed with status ${response?.status ?? ''}`);
        }
        
        if (response.status!== undefined &&
        response.status !== 200 &&
        response.status !== 201) {
        throw new Error(response.statusText);
        }
    
        return response.data;

        
    } catch (error) {
        console.log('Error >>>>>' , error)
    }
}

