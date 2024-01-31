import axios from 'axios'

export const character = async(imageUrl) => {
    try {
        const response = await axios.get(imageUrl);
        return response.data;
    } catch (e) {
        throw e;
    }  
}
