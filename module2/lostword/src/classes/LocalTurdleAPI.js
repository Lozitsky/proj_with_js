class LocalTurdleAPI {
  constructor() {
  }
    
  static getAllWorlds() {
    return fetch('http://localhost:3001/api/v1/words')
      .then(response => response.json())
      // .then(data => data)
      .catch(error => console.log(error));
  }

  static getStats() {
    return fetch('http://localhost:3001/api/v1/games')
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  static addStats(body) {
    return fetch('http://localhost:3001/api/v1/games', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => json.message === 'Game stats recorded successfully.')
      .catch(error => console.log(error));
  }
}

export default LocalTurdleAPI;