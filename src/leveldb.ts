import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'
import path from 'path'

export var dbPath = process.env.DB_PATH || path.join(__dirname, 'mydb');  


export class LevelDB {
    static open(path: string) {
      const encoded = encoding(leveldown(path), { valueEncoding: 'json' })
      return levelup(encoded)
    }
  }



export default LevelDB;
