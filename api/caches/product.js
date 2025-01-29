import axios from "axios";
import { filterByCharacteristics, addScore, JSON_SERVER_URL } from "../utils/product.js";
const DEFAULT = 'all';

export default class ProductCache{
    constructor() {
        this.store = new Map();
    }

    async getFilteredProducts(key = ''){
        const sortedKey = key ? key.split(',').sort((a,b) => a - b).join(',') : DEFAULT;
        if(!this.store.get(sortedKey)){
            console.log('cache miss - fetching...');
            const response = await axios.get(`${JSON_SERVER_URL}/products`);
            let result = response.data;

            if(sortedKey && sortedKey !== DEFAULT){
              result = filterByCharacteristics({data: result, charsString: sortedKey});
            }
        
            result = addScore(result);

            this.store.set(sortedKey, result);
            return result;
        }
        console.log('result in cache...');
        return this.store.get(sortedKey);
    }
}