import database from './../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)


async function mainLoop() {
  try {
    const answer = await terminalController.question('')

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal()
      console.log('process finished')
      return;
    }

    const person = Person.generateInstanceOfString(answer)

    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))

    return mainLoop()
  }
  catch (err) {
    console.error('Deu erro**', err)
    return mainLoop()
  }
}

await mainLoop()

