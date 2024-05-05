import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { describe, expect, it, beforeAll, beforeEach, afterAll, afterEach } from 'vitest';


import MainPage from "../components/main-page";
import { Player } from "../types/Player";
import { createRandomDivisionals } from "../utils/create-random-user";

const fakeDivisionalsName: string[] = ["a", "b", "c"]




const fakePlayers: Player[] = createRandomDivisionals(fakeDivisionalsName, 10)
const server = setupServer(
  http.get("/players", () => {
    return HttpResponse.json(fakePlayers)
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

beforeEach(() => render(<MainPage />));

afterEach(() => server.resetHandlers())

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
  it("must show divisionals name", async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/cargando/i));
    fakeDivisionalsName.forEach((divisionalName) => {
      expect(screen.findAllByText(new RegExp(`divisional ${divisionalName}`, "i"))).toBeDefined();
    });
  });
})

