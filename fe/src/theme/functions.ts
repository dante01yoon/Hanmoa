
export const setBackground = (src = "") => `
  background-image: url('${src}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const functions =  {
  setBackground,
}
