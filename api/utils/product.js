const JSON_SERVER_URL = "http://localhost:4000"; 

const SCORE_MAP = {
    'Humane': 1,
    'Locally Produced': 1,
    'Healthy': 1,
    'Vegan': 1, // gave Vegan a score of 1
    'Plastic-Free': 2,
    'Unhealthy': -1,
    'Wasteful': -1
};

const filterByCharacteristics= ({data = [], charsString}) => {
    return data.filter((item) => {
        const chars = charsString.split(',');
        const includedChars = chars.map((char) => {
            return item.characteristics.includes(char);
        });
    
        return includedChars.some(item => item === true);
    }
);
}

const addScore = (data = []) => {
    return data.map(item => {
       let score = 0;
       item.characteristics.forEach((char) => score += SCORE_MAP[char]);
       return {...item, score }
    });
}


export { filterByCharacteristics, addScore, JSON_SERVER_URL }