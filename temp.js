let names = ["Larin", "Gardo", "Tati", "Lycos"];
let mass = [];
let obj = {
  name: "Garfild",
  say: function () {
    console.log(`I'm ${this.name}`);
  },
};

for (let i = 0; i < names.length; i++) {
  obj.name = names[i];
  obj.say();
  mass[i] = obj;
}

for (let index = 0; index < mass.length; index++) {
  mass[index].say();
}
