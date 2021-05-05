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
    ['Vaporeon', 'vaporeon.png', 360,
        ['Surf', '90', '0.95'],
        ['Body Slam', '85', '0.9'],
        ['Hydro Pump', '105', '0.65'],
        ['Sludge Bomb', '70', '0.95']
    ],
    ['Flareon', 'flareon.png', 360,
        ['Slash', '70', '0.95'],
        ['Fire Punch', '90'],
        ['Flamethrower', '85', '0.95'],
        ['Earthquake', '100', '0.75']],
    ['Jolteon', 'jolteon.png', 360,
        ['Iron Tail', '70', '0.95'],
        ['Thunderbolt', '85', '0.95'],
        ['Volt Tackle', '80', '0.95'],
        ['Thunder', '105', '0.75']],
    ['Leafeon', 'leafeon.png', 360,
        ['Solarbeam', '95', '0.9'],
        ['Razor Leaf', '85', '0.95'],
        ['Sludge Bomb', '80', '0.95'],
        ['Pursuit','70', '0.95' ]],
    ['Espeon', 'espeon.png', 360,
        ['Psybeam', '85', '0.95'],
        ['Crunch', '75', '0.95'],
        ['Nightmare', '90', '0.9'],
        ['Psychic', '95', '0.85']]
];

let typeMatch = {
    'Vaporeon': [[''], ['electric', 'grass'], ['']],
    'Flareon': [[''], ['water'], ['']],
    'Jolteon': [[''], [''], ['']],
    'Leafeon': [[''], ['fire'], ['']],
    'Espeon': [[''], [''], ['']]

}


function spawn(bool){
    let p = pkmnList[Math.floor(Math.random()*pkmnList.length)]
    let pkmn = new Pokemon(p[0], p[1], p[2], p[3], p[4]);

    if(bool){
        for(i=0; i<5; i++){
            document.getElementById('m'+i).value = pkmn.moves[0];
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

for(i=0; i<5; i++){
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
    document.getElementById('comment').innerHTML = '<p> ' + owner + attacker.name + 'used ' + move[0] + '!</p>'
    if(Math.random() < move[4]){
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
        power *= scale
    } else {
        setTimeout(function(){
            document.getElementById('comment').innerHTML = '<p>Attack missed!</p>'
        })
    }
}

function checkWinner(){

}