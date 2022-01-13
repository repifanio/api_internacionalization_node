import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from './../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceOfString(
      '2 bike 10000 2021-01-01 2021-12-31'
    )

    const expected = {
      id: '2',
      vehicles: ['bike'],
      kmTraveled: '10000',
      from: '2021-01-01',
      to: '2021-12-31'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should return a person formated', () => {
      const person = new Person({
        id: '2',
        vehicles: ['bike'],
        kmTraveled: '10000',
        from: '2021-01-01',
        to: '2021-12-31'
      })

      const result = person.formatted('pt-BR')

      const expected = {
        id: 2,
        vehicles: 'bike',
        kmTraveled: '10.000 km',
        from: '01 de janeiro de 2021',
        to: '31 de dezembro de 2021'
      }

      expect(result).to.be.deep.equal(expected)

    }
  )

  it('should return a message of error if person has a bad format', () => {
    const person = Person.generateInstanceOfString(
      '2 bike, avião, navio, carro 10000 2021-01-01 2021-12-31'
    )

    const expected = 'the input of date is inconformed'

    expect(person).to.be.deep.equal(expected)
  })
})