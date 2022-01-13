import Chalk from 'chalk'
import DraftLog from 'draftlog'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import Person from './person.js'
import { throws } from 'assert'


class TerminalController {
  constructor(){
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language){
    DraftLog(console).addLineListener(process.stdin)

    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language){
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)
    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item){
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  question(msg = '') {  
    return new Promise(resolve => this.terminal.question(msg, resolve))  
  }

  closeTerminal(){
    this.terminal.close()
  }

  getTableOptions(){
    return {
      leftPad: 2,
      columns: [
          { field: "id", name: Chalk.cyan("ID") },
          { field: "vehicles", name: Chalk.cyan("VEHICLES") },
          { field: "kmTraveled", name: Chalk.cyan("TRAVELED") },
          { field: "from", name: Chalk.cyan("FROM") },
          { field: "to", name: Chalk.cyan("TO") }
      ]
    }
  }
}

export default TerminalController