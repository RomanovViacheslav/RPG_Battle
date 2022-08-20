const readline = require("readline");
const clc = require("cli-color");
const heroes = require("./heroes");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playRpg = () => {
  let compHero = {};
  let userHero = {};

  let cooldownArr = [];
  let cooldownArrUser = [];

  const fight = (actionComp, actionUser) => {
    let damageUser = getDamage(
      actionComp.physicalDmg,
      actionComp.magicDmg,
      actionUser.physicArmorPercents,
      actionUser.magicArmorPercents
    );
    userHero.maxHealth -= damageUser;
    let damageComp = getDamage(
      actionUser.physicalDmg,
      actionUser.magicDmg,
      actionComp.physicArmorPercents,
      actionComp.magicArmorPercents
    );
    compHero.maxHealth -= damageComp;
    console.log(clc.green(`Противник нанес вам урон ${damageUser} hp`));
    console.log(clc.green(`Ваше здоровье ${userHero.maxHealth} hp`));
    console.log(clc.blue(`Вы нанесли противнику урон ${damageComp} hp`));
    console.log(clc.blue(`Здоровье противника ${compHero.maxHealth} hp`));

    cooldownArr = cooldownArr.filter((elem) => elem.cooldown > 0);
    cooldownArr.forEach((elem) => {
      elem.cooldown -= 1;
    });

    cooldownArrUser = cooldownArrUser.filter((elem) => elem.cooldown > 0);
    cooldownArrUser.forEach((elem) => {
      elem.cooldown -= 1;
    });

    if (userHero.maxHealth < 1) {
      console.log(clc.bgRed("Вы проиграли!"));
      process.exit(1);
    }
    if (compHero.maxHealth < 1) {
      console.log(clc.bgCyan("Вы победили!"));
      process.exit(1);
    } else {
      setTimeout(console.log, 2000, "Бой продолжается...");
      setTimeout(stepComp, 3000);
    }
  };

  const stepComp = () => {
    const generateAction = () => {
      const action = {
        ...compHero.moves[Math.floor(Math.random() * compHero.moves.length)],
      };
      return action;
    };

    let actionComp = {};

    for (let i = 0; i <= Infinity; i++) {
      let obj = generateAction();
      if (cooldownArr.find((item) => item.name == obj.name) == undefined) {
        actionComp = obj;
        break;
      }
    }

    console.log(
      clc.green(`Противник(${compHero.name}) использует против вас `) +
        clc.bgGreen(`"${actionComp.name}"`)
    );
    cooldownArr.push(actionComp);

    setTimeout(stepUser, 2500, actionComp);
  };

  const getDamage = (physicalDmg, magicDmg, physicArmor, magicArmor) => {
    if (magicArmor - magicDmg < 0) {
      return magicDmg;
    }
    if (physicArmor - physicalDmg < 0) {
      return physicalDmg;
    } else {
      return 0;
    }
  };

  const inputValidation = (answer, len) => {
    if (!answer.trim()) {
      console.log(clc.red(`Вы не ввели число!`));
      return false;
    } else if (isNaN(answer)) {
      console.log(clc.red(`Ввести можно только число!`));
      return false;
    } else if (answer < 1 || answer > len) {
      console.log(clc.red(`Вариант с таким числом отсутствует!`));
      return false;
    } else {
      return true;
    }
  };

  const stepUser = (actionComp) => {
    rl.question(
      clc.blue(
        `Чтобы выбрать свои действия введите число:\n` +
          userHero.moves
            .map((elem, index) => `${index + 1} - ${elem.name}`)
            .join("\n") +
          "\n"
      ),
      function check(answer) {
        let verified = inputValidation(answer, userHero.moves.length);
        if (!verified) {
          return rl.question(`Введите число: `, check);
        } else {
          const actionUser = { ...userHero.moves[answer - 1] };
          let coolAction = cooldownArrUser.find(
            (item) => item.name == actionUser.name
          );
          if (coolAction != undefined) {
            return rl.question(
              clc.red(
                `Действие "${actionUser.name}" недоступно ${
                  coolAction.cooldown + 1
                } ход(а)\nВыберите другое действие: `
              ),
              check
            );
          } else {
            console.log(
              clc.blue(`Вы выбрали действие -`) +
                clc.bgBlue(`"${actionUser.name}"`)
            );

            cooldownArrUser.push(actionUser);
            setTimeout(fight, 2500, actionComp, actionUser);
          }
        }
      }
    );
  };

  const chooseLevel = () => {
    const a = "Новичок";
    const b = "Опытный";
    const c = "Мастер";
    rl.question(
      clc.yellow(`Выберите уровень сложности игры
    1 - ${a}
    2 - ${b}
    3 - ${c}\n`),
      function check(answer) {
        let verified = inputValidation(answer, 3);
        if (!verified) {
          rl.question(`Введите число: `, check);
        } else {
          switch (answer) {
            case "1":
              userHero.maxHealth = 20;
              console.log(
                clc.yellow(`Вы выбрали уровень сложности -`) +
                  clc.bgYellow(`"${a}"`)
              );
              console.log(
                clc.yellow(
                  `На этом уровне у вашего героя ${userHero.maxHealth} очков здоровья`
                )
              );
              stepComp();
              break;
            case "2":
              userHero.maxHealth = 15;
              console.log(
                clc.yellow(`Вы выбрали уровень сложности -`) +
                  clc.bgYellow(`"${b}"`)
              );
              console.log(
                clc.yellow(
                  `На этом уровне у вашего героя ${userHero.maxHealth} очков здоровья`
                )
              );
              stepComp();
              break;
            case "3":
              userHero.maxHealth = 10;
              console.log(
                clc.yellow(`Вы выбрали уровень сложности -`) +
                  clc.bgYellow(`"${c}"`)
              );
              console.log(
                clc.yellow(
                  `На этом уровне у вашего героя ${userHero.maxHealth} очков здоровья`
                )
              );
              stepComp();
              break;
          }
        }
      }
    );
  };

  const chooseHero = (side = "противник", callback = chooseLevel) => {
    rl.question(
      clc.blue(
        `Кто будет ваш ${side}?\n` +
          heroes
            .map((elem, index) => `${index + 1} - ${elem.name}`)
            .join("\n") +
          "\n"
      ),
      function check(answer) {
        let verified = inputValidation(answer, 3);
        if (!verified) {
          rl.question(`Введите число: `, check);
        } else {
          side === "герой"
            ? (userHero = JSON.parse(JSON.stringify(heroes[answer - 1])))
            : (compHero = JSON.parse(JSON.stringify(heroes[answer - 1])));
          console.log(`Ваш ${side} - ${heroes[answer - 1].name}`);

          callback();
        }
      }
    );
  };
  chooseHero("герой", chooseHero);
};

playRpg();
