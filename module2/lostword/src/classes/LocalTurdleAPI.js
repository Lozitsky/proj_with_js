class LocalTurdleAPI {
  constructor() {
  }
    
  static getAllWorlds() {
    return fetch('http://localhost:3001/api/v1/words')
      .then(response => response.json())
      // .then(data => data)
      .catch(error => console.log(error));
  }
}

export default LocalTurdleAPI;