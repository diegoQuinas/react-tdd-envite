import { faker } from "@faker-js/faker"
import { Player } from "../types/Player"


export const createRandomPlayer = (div: string): Player => {
  return { id: faker.string.uuid(), fullName: faker.person.fullName(), divisional: div }
}

export const createRandomDivisional = (div: string, num: number): Player[] => {
  let result = []
  for (let i = 0; i < num; i++) {
    result.push(createRandomPlayer(div))
  }
  return result
}
