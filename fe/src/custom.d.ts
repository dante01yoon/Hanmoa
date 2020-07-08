// svg
declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>; 
  const content: any;   
  export default content;
}

// jpg
declare module '*.jpg';
// png
declare module '*.png';