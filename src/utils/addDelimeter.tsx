export default function addDelimeter(code: number) {
  return code.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
