import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { describe, expect, it, beforeAll, beforeEach, afterAll } from 'vitest';


import MainPage from "../components/main-page";
import { Player } from "../types/Player";
import { createRandomDivisional } from "../utils/create-random-user";


const fakeDivisionalA: Player[] = createRandomDivisional("a", 30);
const fakeDivisionalB: Player[] = createRandomDivisional("b", 30);
const fakeDivisionalC: Player[] = createRandomDivisional("c", 30);

const fakePlayers: Player[] = [...fakeDivisionalA, ...fakeDivisionalB, ...fakeDivisionalC]


const server = setupServer(
  http.get("/players", () => {
    return HttpResponse.json(fakePlayers)
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

beforeEach(() => render(<MainPage />));

describe("Main Page mount", () => {
  it("must display the main page title", async () => {
    expect(screen.getByText(/envite futbol/i)).toBeDefined();
    await waitForElementToBeRemoved(screen.getByText(/cargando/i))

  });
});

describe("Player List", () => {
  it("must display player names", async () => {
    const actualPlayersName = await screen.findAllByRole("listitem");
    actualPlayersName.forEach((element, index) => {
      expect(element.textContent).toBe(fakePlayers[index].fullName);
    });
  });
});

