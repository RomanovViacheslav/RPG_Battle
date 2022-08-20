const heroes = [
  {
    maxHealth: 10,
    name: "Лютый",
    moves: [
      {
        name: "Удар когтистой лапой",
        physicalDmg: 3, // физический урон
        magicDmg: 0, // магический урон
        physicArmorPercents: 20, // физическая броня
        magicArmorPercents: 20, // магическая броня
        cooldown: 0, // ходов на восстановление
      },
      {
        name: "Огненное дыхание",
        physicalDmg: 0,
        magicDmg: 4,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: "Удар хвостом",
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 50,
        magicArmorPercents: 0,
        cooldown: 2,
      },
    ],
  },

  {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
      {
        name: "Удар боевым кадилом",
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 50,
        cooldown: 0,
      },
      {
        name: "Вертушка левой пяткой",
        physicalDmg: 4,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 4,
      },
      {
        name: "Каноничный фаербол",
        physicalDmg: 0,
        magicDmg: 5,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: "Магический блок",
        physicalDmg: 0,
        magicDmg: 0,
        physicArmorPercents: 100,
        magicArmorPercents: 100,
        cooldown: 4,
      },
    ],
  },
  {
    maxHealth: 10,
    name: "Дарт Вейдер",
    moves: [
      {
        name: "Удар световым мечом",
        physicalDmg: 2, // физический урон
        magicDmg: 0, // магический урон
        physicArmorPercents: 20, // физическая броня
        magicArmorPercents: 20, // магическая броня
        cooldown: 0, // ходов на восстановление
      },
      {
        name: "Удушение Силы",
        physicalDmg: 0,
        magicDmg: 3,
        physicArmorPercents: 20,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: "Удар ногой",
        physicalDmg: 3,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 2,
      },
      {
        name: "Люк, я твой отец!",
        physicalDmg: 0,
        magicDmg: 0,
        physicArmorPercents: 50,
        magicArmorPercents: 50,
        cooldown: 3,
      },
    ],
  },
];

module.exports = heroes;
