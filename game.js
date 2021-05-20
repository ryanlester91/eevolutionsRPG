class Pokemon{
    constructor(name, sprite, HP, moves) {
        this.name = name;
        this.sprite = sprite;
        this.HP = HP;
        this.fullHP = HP;
        this.moves = moves;
    }
}

let pkmnList = [
    ['Vaporeon', 'https://img.pokemondb.net/sprites/black-white/normal/vaporeon.png', 360,
        [['Surf', 'water', '90', '0.95'],
        ['Body Slam', 'normal', '85', '0.9'],
        ['Hydro Pump', 'water', '105', '0.65'],
        ['Sludge Bomb', 'poison', '70', '0.95']]
    ],
    ['Flareon', 'https://img.pokemondb.net/sprites/black-white/normal/flareon.png', 360,
        [['Slash', 'normal', '70', '0.95'],
        ['Fire Punch','fire', '90', '0.9'],
        ['Flamethrower', 'fire', '85', '0.95'],
        ['Earthquake', 'ground', '100', '0.75']]
    ],
    ['Jolteon', 'https://img.pokemondb.net/sprites/black-white/normal/jolteon.png', 360,
        [['Iron Tail', 'steel', '70', '0.95'],
        ['Thunderbolt', 'electric', '85', '0.95'],
        ['Volt Tackle', 'electric', '80', '0.95'],
        ['Thunder','electric', '105', '0.75']]
    ],
    ['Leafeon', 'https://img.pokemondb.net/sprites/black-white/normal/leafeon.png', 360,
        [['Solarbeam', 'grass', '95', '0.9'],
        ['Razor Leaf', 'grass', '85', '0.95'],
        ['Sludge Bomb', 'poison', '80', '0.95'],
        ['Dig', 'ground', '75', '0.95' ]]
],
    ['Espeon', 'https://img.pokemondb.net/sprites/black-white/normal/espeon.png', 360,
        [['Psybeam', 'psychic', '85', '0.95'],
        ['Crunch', 'normal', '75', '0.95'],
        ['Nightmare', 'ghost', '90', '0.9'],
        ['Psychic', 'psychic', '95', '0.85']]
    ],

    ['Sylveon', 'https://img.pokemondb.net/sprites/x-y/normal/sylveon.png', 360,
        [['Confusion', 'psychic', '85', '0.9'],
        ['DoubleSlap', 'normal', '75', '0.95'],
        ['Sweet Kiss', 'fairy', '90', '0.9'],
        ['Taunt', 'normal', '70', '0.95']]
    ],

    ['Eevee', 'https://img.pokemondb.net/sprites/black-white/normal/eevee.png', 360,
        [['Low Kick', 'fighting', '90', '0.75'],
        ['Bite', 'normal', '75', '0.95'],
        ['Iron Tail', 'steel', '70', '0.95'],
        ['Dig', 'ground', '80', '0.85']]
    ],

    ['Umbreon', 'https://img.pokemondb.net/sprites/black-white/normal/umbreon.png', 360,
        [['Comet Punch', 'fighting', '90', '0.8'],
        ['Black Hole Eclipse', 'dark', '110', '0.65'],
        ['Faint Attack', 'dark', '70', '0.95'],
        ['Crunch', 'dark', '80', '0.95']]
    ],

    ['Glaceon', 'https://img.pokemondb.net/sprites/x-y/normal/glaceon.png', 360,
        [['Whirlwind', 'flying', '70', '0.95'],
        ['Bubblebeam', 'water', '90', '0.9'],
        ['Blizzard', 'ice', '110', '0.65'],
        ['Ice Spikes', 'ice', '80', '0.95']]
    ]

];

let typeMatch = {
    'Vaporeon': [[''], ['electric', 'grass'], ['']],
    'Flareon': [[''], ['water'], ['']],
    'Jolteon': [[''], [''], ['']],
    'Leafeon': [[''], ['fire'], ['']],
    'Espeon': [[''], [''], ['']],
    'Sylveon': [[''], [''], ['']],
    'Eevee': [[''], [''], ['']],
    'Umbreon': [[''], [''], ['']],
    'Glaceon': [[''], [''], ['']]

}


function spawn(bool){
    let p = pkmnList[Math.floor(Math.random()*pkmnList.length)]
    let pkmn = new Pokemon(p[0], p[1], p[2], p[3]);

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
            attack(move, pk1, pk2, 'hp2', '');
            setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random()*3)], pk2, pk1, 'hp1', 'Enemy ')
        })
    }
    addHandler(btn, move, pk1, pk2)
}


function attack(move, attacker, receiver, HP, owner){
    document.getElementById('comment').innerHTML = '<p> ' + owner + attacker.name + ' used ' + move[0] + '!</p>'
    if(Math.random() < move[3]){
        let power = move[2] += Math.floor(Math.random()*10);
        let rtype = typeMatch[receiver.name];
        let mtype = move[1];
        let scale = 1;

        for(i=0; i<rtype.length; i++){
            if(rtype[i].include(mtype)){
                switch(i){
                    case 0:
                        scale = 0;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It had no effect!</p>'
                        }, 1000);
                        break;
                        case 1:
                        scale = 2;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It was super effective!</p>'
                        }, 1000);
                        break;
                        case 2:
                        scale = 0.5;
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p>It was not very effective!</p>'
                        }, 1000);
                        break;
                } break;
            }
        }
        power *= scale;
        receiver.HP -=Math.floor(power);
        document.getElementById(HP).innerHTML = '<p>HP: ' + receiver.HP + receiver.fullHP + '</p>';
    } else {
        setTimeout(function(){
            document.getElementById('comment').innerHTML = '<p>Attack missed!</p>'
        })
    }
}

function checkWinner(HP){
    let f = (pk1.HP <= 0) ? pk1 : (pk2.HP <=0) ? pk2 : false;
    if(f!=false) {
        alert('GAME OVER! ' + f.name +' has fainted!');
        document.getElementById(HP).innerHTML = '<p>HP: 0/' + f.fullHP + '</p>';
        setTimeout(function(){
            location.reload;
        }, 1500)
    } 

}


