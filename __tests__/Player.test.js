const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

test ('creates a player object', () => {
  const player = new Player('Me');

  expect(player.name).toBe('Me');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});

test("gets Player's health value", () => {
  const player = new Player('me');

  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not', () => {
  const player = new Player('me');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

test('subtracts from players health', () => {
  const player = new Player('me');
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toEqual(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});

test('gets players attack value', () => {
  const player = new Player('me');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
})

test('adds a potion to the inventory', () => {
  const player = new Player('me');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
})

test('uses a potion from inventory', () => {
  const player = new Player('me');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
})
