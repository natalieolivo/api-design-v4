import * as user from "../user";
// Note:
// 1. Its best practice to use a local db to run your tests and not hosted or production db
// 2. Its best practice to wipe out your db (clean) before running tests
// Delete everything from DB after every test run
// 3. You never want to have stateful tests where one test runs and the next test relies on the last test outcome.
// Every test should be stateless, and not rely on any other test!!

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "meee", password: "secretpassword" } };
    const res = {
      json: ({ token }) => {
        console.log(`actual token:`, token);
        expect(token).toBeTruthy();
      },
    };
    // How do spies work? Above json method would be our spy
    // We want to see that above json method is called, and called with a token.
    await user.createNewUser(req, res, () => {});
  });
});
