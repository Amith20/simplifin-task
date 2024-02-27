import React, { useEffect, useState } from "react"
import {  getSearchResults, getTrendingImages } from "./fileUtil";
import './App.css'

function App() {

  const [imgData , setImageData] = useState<any[]>([]);
  const [serachTerm , setSearchTerm] = useState<string>('');
  const [imgType , setImgType] = useState<string>('gifs');


  useEffect(() => {
    getTrendingImages(imgType).then((res:any)=> {
      if(res.data && res.data.length > 0){
        setImageData(res.data);
      }
    })

  } ,[])

  

  const onButtonClick = (type:string) => {

      getTrendingImages(type).then((res:any) => {
        if(res.data && res.data.length > 0){
          setImageData(res.data);
        }else{
          setImageData([]);
        }
      })
  }

  return (
    <>
      <nav className="navbar" id="navbar">
        <div>
          <input 
            type="search" 
            className="serachbar" 
            placeholder="Search for GIF's and Stickers"
            value={serachTerm} 
            onChange={(e) => {

                setSearchTerm(e.target.value);

                getSearchResults(e.target.value , imgType).then((res) => {
                if(res.data && res.data.length > 0){
                  setImageData(res.data)
                }
            })
          }} />
        </div>
        <div>
          <button 
              className={`button ${ imgType === 'gifs' ? 'active' : ''}`} 
              onClick={() => {
                  onButtonClick('gifs');
                  imgType !== 'gifs' ? setImgType('gifs') : null;
          }}>
            GIFs
          </button>

          <button 
              className={`button ${ imgType === 'stickers' ? 'active' : ''}`} 
              onClick={() => {
                  onButtonClick('stickers');
                  imgType !== 'stickers' ? setImgType('stickers') : null;
          }}>
            Stickers
          </button>
        </div>
      </nav>
      <main>
        <h3 className="heading">Trending</h3>
        <hr/>
          <div className="image-grid">
            { (imgData && imgData.length > 0) ?
            
              imgData.map((img:any ,index:number) => (
                <div key={index}>
                    <iframe 
                      src={img.embed_url} 
                      style={{backgroundColor:'black'}} 
                      width={200} 
                      height={200}
                    />
                    <p className="img-title">{img.title}</p>
                </div>
              ))
              
              :
              'Loading'
            }
          </div>
      </main>
    </>
    
  )
}

export default App
