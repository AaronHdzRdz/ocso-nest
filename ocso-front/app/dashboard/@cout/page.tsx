import axios from 'axios'

const CountPage = async() => {
    const countLocation = await axios.get("http://127.0.0.1:4000/locations")
    return countLocation?.data.length;
}

export default CountPage