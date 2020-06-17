/**
 * 
 * @param url get string from browser url without host
 * @return [include: string, exclude: string]
 * include has string with topic -> /topic/netflix
 * exclude has string without topic -> netflix
 */
export const pathExtractor = (url:string) => {
  // '/topic/netflix'
  const urlArray = url.split('/');
  console.log('urlArray', urlArray); 
  if(urlArray.length !== 3){
    return ['all','all']; 
  }  
  else{
    if(urlArray[2] === ''){
      return ['/','all'];
    }
    return [url, urlArray[2]]; 
  }
}