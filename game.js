class Pokemon{
    constructor(name, sprite, HP, moves) {
        this.name = name;
        this.sprite = sprite;
        this.HP = HP;
        this.newHP = HP;
        this.fullHP = HP;
        this.moves = moves;
    }
}

let pkmnList = [
    ['Vaporeon', 'https://img.pokemondb.net/sprites/black-white/normal/vaporeon.png', 360,
        [['Surf', 'water', '90', '0.95', '30'],
        ['Body Slam', 'normal', '85', '0.9', '30'],
        ['Hydro Pump', 'water', '105', '0.65', '30'],
        ['Sludge Bomb', 'poison', '70', '0.95', '30']]
    ],
    ['Flareon', 'https://img.pokemondb.net/sprites/black-white/normal/flareon.png', 360,
        [['Slash', 'normal', '70', '0.95','30'],
        ['Fire Punch','fire', '90', '0.9','30'],
        ['Flamethrower', 'fire', '85', '0.95','30'],
        ['Earthquake', 'ground', '100', '0.75', '30']]
    ],
    ['Jolteon', 'https://img.pokemondb.net/sprites/black-white/normal/jolteon.png', 360,
        [['Iron Tail', 'steel', '70', '0.95', '30'],
        ['Thunderbolt', 'electric', '85', '0.95','30'],
        ['Volt Tackle', 'electric', '80', '0.95','30'],
        ['Thunder','electric', '105', '0.75','30']]
    ],
    ['Leafeon', 'https://img.pokemondb.net/sprites/black-white/normal/leafeon.png', 360,
        [['Solarbeam', 'grass', '95', '0.9', '30'],
        ['Razor Leaf', 'grass', '85', '0.95','30'],
        ['Sludge Bomb', 'poison', '80', '0.95','30'],
        ['Dig', 'ground', '75', '0.95','30']]
],
    ['Espeon', 'https://img.pokemondb.net/sprites/black-white/normal/espeon.png', 360,
        [['Psybeam', 'psychic', '85', '0.95', '30'],
        ['Crunch', 'normal', '75', '0.95','30'],
        ['Nightmare', 'ghost', '90', '0.9','30'],
        ['Psychic', 'psychic', '95', '0.85','30']]
    ],

    ['Sylveon', 'https://img.pokemondb.net/sprites/x-y/normal/sylveon.png', 360,
        [['Confusion', 'psychic', '85', '0.9', '30'],
        ['DoubleSlap', 'normal', '75', '0.95', '30'],
        ['Sweet Kiss', 'fairy', '90', '0.9', '30'],
        ['Taunt', 'normal', '70', '0.95', '30']]
    ],

    ['Eevee', 'https://img.pokemondb.net/sprites/black-white/normal/eevee.png', 360,
        [['Low Kick', 'fighting', '90', '0.75', '30'],
        ['Bite', 'normal', '75', '0.95', '30'],
        ['Iron Tail', 'steel', '70', '0.95', '30'],
        ['Dig', 'ground', '80', '0.85', '30']]
    ],

    ['Umbreon', 'https://img.pokemondb.net/sprites/black-white/normal/umbreon.png', 360,
        [['Comet Punch', 'fighting', '90', '0.8', '30'],
        ['Black Hole Eclipse', 'dark', '110', '0.65', '30'],
        ['Faint Attack', 'dark', '70', '0.95', '30'],
        ['Crunch', 'dark', '80', '0.95', '30']]
    ],

    ['Glaceon', 'https://img.pokemondb.net/sprites/x-y/normal/glaceon.png', 360,
        [['Whirlwind', 'flying', '70', '0.95','30'],
        ['Bubblebeam', 'water', '90', '0.9', '30'],
        ['Blizzard', 'ice', '110', '0.65', '30'],
        ['Ice Spikes', 'ice', '80', '0.95', '30']]
    ]

];

let typeMatch = {
    'Vaporeon': [['water'], ['electric', 'grass'], ['ice']],
    'Flareon': [['fire'], ['water', 'rock'], ['grass']],
    'Jolteon': [['electric'], ['ground', 'grass'], ['ice', 'flying']],
    'Leafeon': [['grass'], ['fire', 'ice', 'poison','flying'], ['electric']],
    'Espeon': [['psychic'], ['dark', 'steel'], ['fighting, psychic']],
    'Sylveon': [['fairy'], ['fire', 'steel'], ['fighting', 'dark']],
    'Eevee': [['normal'], ['steel', 'rock'], ['ghost']],
    'Umbreon': [['dark'], ['fighting', 'fairy'], ['psychic']],
    'Glaceon': [['ice'], ['steel','fire', 'water'], ['ice']]

}


function spawn(bool){
    let p = pkmnList[Math.floor(Math.random()*pkmnList.length)]
    let pkmn = new Pokemon(p[0], p[1], p[2], p[3], p[4]);

    if(bool){
        for(i=0; i<4; i++){
            document.getElementById('m'+i).value = pkmn.moves[i][0];
        }
    } return pkmn;
}

let pk1 = spawn(true);
s1 = document.createElement('img');
s1.src = pk1.sprite;
document.getElementById('pk1').appendChild(s1);
document.getElementById('hp1').innerHTML = '<p>HP: ' + pk1.HP + '/' + pk1.fullHP + '</p>';

let pk2 = spawn(false);
s2 = document.createElement('img');
s2.src = pk2.sprite;
document.getElementById('pk2').appendChild(s2);
document.getElementById('hp2').innerHTML = '<p>HP: ' + pk2.HP + '/' + pk2.fullHP + '</p>';

for(i=0; i<4; i++){
    let btn = document.getElementById('m'+i);
    let move = pk1.moves[i];
    function addHandler(btn, move, pk1, pk2) {
        btn.addEventListener('click', function(e){
            attack(move, pk1, pk2, '');
            setTimeout(attack, 3000, pk2.moves[Math.floor(Math.random()*3)], pk2, pk1, 'Enemy ');
        })
    }
    addHandler(btn, move, pk1, pk2)
}


function attack(move, attacker, receiver, owner) {
    document.getElementById('comment').innerHTML = '<p> ' + owner + attacker.name + ' used ' + move[0] + '!</p>'
    if(Math.random() < move[3]){
        let power = move[2] += Math.floor(Math.random()*10);
        let rtype = typeMatch[receiver.name];
        let mtype = move[1];
        let scale = 1;
        let damagePoints = move[4];
      
        for(i=0; i<rtype.length; i++){
            if(rtype[i].includes(mtype)){
                switch(i){
                    case 0:
                        scale = 0;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It had no effect!</p>'
                        }, 3000);
                        break;
                        case 1:
                        scale = 2;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It was super effective!</p>'
                        }, 3000);
                        break;
                        case 2:
                        scale = 0.5;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It was not very effective!</p>'
                        }, 3000);
                        break;
                } break;
            }
        }
        power *= scale;
        //receiver.HP -=Math.floor(power);

        receiver.HP -= damagePoints;
       console.log(receiver);
        document.getElementById('hp1').innerHTML = '<p>HP: ' + receiver.HP + '/' + receiver.fullHP + '</p>';
        //attack(move, attacker, receiver, HP, newHP, owner);
        if(receiver.HP <=0){
        checkWinner();
    }
    } else {
        setTimeout(function(){
            document.getElementById('comment').innerHTML = '<p>Attack missed!</p>'
        }, 3000);
    }
}


function checkWinner(HP){
    let f = (pk1.HP <= 0) ? pk1 : (pk2.HP <=0) ? pk2 : false;
    if(f!=false) {
        alert('GAME OVER! ' + f.name +' has fainted!');
        document.getElementById(HP).innerHTML = '<p>HP: 0/' + f.fullHP + '</p>';
        setTimeout(function(){
            location.reload;
        }, 3000);
    }
}
