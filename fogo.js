//const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



var rgbs = [
    0x07,0x07,0x07,
    0x1F,0x07,0x07,
    0x2F,0x0F,0x07,
    0x47,0x0F,0x07,
    0x57,0x17,0x07,
    0x67,0x1F,0x07,
    0x77,0x1F,0x07,
    0x8F,0x27,0x07,
    0x9F,0x2F,0x07,
    0xAF,0x3F,0x07,
    0xBF,0x47,0x07,
    0xC7,0x47,0x07,
    0xDF,0x4F,0x07,
    0xDF,0x57,0x07,
    0xDF,0x57,0x07,
    0xD7,0x5F,0x07,
    0xD7,0x5F,0x07,
    0xD7,0x67,0x0F,
    0xCF,0x6F,0x0F,
    0xCF,0x77,0x0F,
    0xCF,0x7F,0x0F,
    0xCF,0x87,0x17,
    0xC7,0x87,0x17,
    0xC7,0x8F,0x17,
    0xC7,0x97,0x1F,
    0xBF,0x9F,0x1F,
    0xBF,0x9F,0x1F,
    0xBF,0xA7,0x27,
    0xBF,0xA7,0x27,
    0xBF,0xAF,0x2F,
    0xB7,0xAF,0x2F,
    0xB7,0xB7,0x2F,
    0xB7,0xB7,0x37,
    0xCF,0xCF,0x6F,
    0xDF,0xDF,0x9F,
    0xEF,0xEF,0xC7,
    0xFF,0xFF,0xFF
];

function main(){

    //setInterval(calculateFirePropagation, 140);
    calculateFirePropagation();

}


function calculateFirePropagation(){

    var row = 100;
    var col = 100;

    matriz = startFire(col, row);
    setInterval(function(){
        matriz = MakeFire(matriz, col, row);
        
        RenderFIre(matriz, col, row); 
    },40);
}

function startFire(colArg, rowArg){

    var matriz = new Array(colArg);
    var last_pos = matriz.length-1;

    var matriz = [];

    for ( var row = 0; row < rowArg; row++ ) {
        matriz[ row ] = [];
        for ( var col = 0; col < colArg; col++ ) {
            matriz[ row ][ col ] = 1;
        }
    }

    for(col = 0; col <= colArg-1; col++){
        matriz[rowArg-1][col] = 36;
    }

    return matriz;
}



function MakeFire(matriz, colArg, rowArg){

    for (var row = rowArg-2; row >= 0; row--) {
        for (var col = colArg; col >= 0; col--) {
            matriz[row][col +WillSpread(1, 30)] = (matriz[row+1][col] -1 < 0)? 0:matriz[row+1][col] -WillSpread(1, 60);
        }
    }

    return matriz;
}





function RenderFIre(matriz, colArg, rowArg){
    
    var html_matriz = document.querySelector('.matriz');

    var HTMLNovo = ' ';

    HTMLNovo = '<table class = \'table\'>';

    for(row = 0; row < rowArg; row++){
        
        HTMLNovo = HTMLNovo + '<tr>';
            for(col = 0; col < colArg; col++){

            fireIntensity = matriz[row][col];
            index = getIndex(col, row)

            HTMLNovo = HTMLNovo + '<td class="pixel"'
            HTMLNovo = HTMLNovo + `style="background-color: rgb(${PopulatePallete(fireIntensity)})"`;
            HTMLNovo = HTMLNovo + '>';
            //HTMLNovo = HTMLNovo + fireIntensity;
            //HTMLNovo = HTMLNovo + '<div class=\'number\'>';
            //HTMLNovo = HTMLNovo + index;
            //HTMLNovo = HTMLNovo + '</div>';
            HTMLNovo = HTMLNovo + '</td>';
        }
        
        HTMLNovo = HTMLNovo + '</tr>';
    }
    
    HTMLNovo = HTMLNovo + '</table>';

    html_matriz.innerHTML = HTMLNovo;
}



function WillSpread(active, chance){
    if(active){
        var chance_of_spreading = Math.random() * 100;
        
        if(chance_of_spreading <= chance)
            return 1;
    }
    return 0;
}

function getIndex(col, row){
    return (col*10+row);
}

function PopulatePallete(fireIntensity){
    var palette = new Array(rgbs.length/3);
    var color;

    for(var i = 0; i < rgbs.length / 3; i++) {
        palette[i] = {
            r : rgbs[i * 3 + 0], 
            g : rgbs[i * 3 + 1], 
            b : rgbs[i * 3 + 2] 
        }
    }

    if(fireIntensity > 0 && fireIntensity < 37)
        color = palette[fireIntensity];
    else
        color = palette[1];

    return `${color.r},${color.g},${color.b}`;
}

