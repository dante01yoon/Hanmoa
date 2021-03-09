const getRootData = (dataName: string): any => {
  if(!window.ROOT_DATA){
    window.ROOT_DATA = {};
  }

  if(!window.ROOT_DATA[dataName]){
    const attrName = `data-${dataName}`;
    const rootEl = document.getElementById("root");
    if(rootEl){
      const rootAttribute = rootEl.getAttribute(attrName);
      const test =  rootAttribute && JSON.parse(rootAttribute)
      window.ROOT_DATA[dataName] = rootAttribute ?
        JSON.parse(rootAttribute) :
        null;
      rootEl.removeAttribute(attrName);
    }
  }

  return window.ROOT_DATA[dataName];
}

export default getRootData;