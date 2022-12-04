import axios from 'axios';

class DictionaryService {
  private baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  public async getDefinition(word: string) {
    const response = await axios.get(`${this.baseUrl}/${word}`);
    return response.data;
  }
}

const dictionaryService = new DictionaryService()
export default dictionaryService