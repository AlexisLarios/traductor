var x=prompt("Ingrese instrucción") ;
var y;
var z;
var a;
var rs1;
var rs2;
var RS1;
var RS2;
var rd;
var opcode=33;
var ins;
var RD;
var risc;
var ind;

console.log(x);
x=x.split(",");
y=x[0].split(" ");
ins=y[0];
rd=(y[1].split("x"));
RD=parseInt(rd[1]);

function concierte_hex(){
RS2=RS2.toString(16);
risc=risc+RS2;
}
function CON_RS1(){

    if(RS2<15){
        if(RS2>10){
            concierte_hex();
        }else{
            risc=risc+RS2;
           }
        }else if(RS2==15){
            risc=risc+"F";
        }
        
        if(RS2>15){
            RS2=RS2-16
            if(RS2>9){
                concierte_hex();
            }else{
                risc=risc+RS2;
            }
            
        }
}
function CON_RS2(){
if(RS1%2==0){
    
    if(RS1/2>9){
        RS1=RS1/2;
        RS2=RS1;
        concierte_hex();
    }else{
        risc=risc+RS1/2;
    }
    if(ins=="ld" || ins=="sd" ){
        risc=risc+"3";
    }else{
    risc=risc+"0";
    }
     
}else{
    RS1=RS1-parseInt(RS1/2+1);
    if(RS1>9){
        RS2=RS1;
        concierte_hex();
       
    }else{
    risc=risc+RS1;
    }
if(ins=="ld"){
    risc=risc+"B";
}else{
   
risc=risc+"8";
 
}
}
}

if(ins=="add"){
    rs2=x[2].split("x");
    RS2=rs2[1];
    if(RS2>15){
        risc="01";
    }else{
        risc="00";
    }
}else if(ins=="sub"){
    rs2=x[2].split("x");
    RS2=rs2[1];
    if(RS2>15){
        risc="41";
    }else{
        risc="40";
    }
}

if(ins=="add" || ins=="sub"){


rs1=x[1].split("x");
RS1=parseInt(rs1[1]);

if(RS2>31){
    alert("Overflow");
}else{
    CON_RS1();
}
CON_RS2();

if(RD>31){
    alert("Overflow");
}else{
    if(RD%2==0){
    
        if(RD/2>9){
            RD=RD/2;
            RS2=RD;
            concierte_hex();
        }else{
            risc=risc+RD/2;
        }
         
    }else{
        RD=RD-parseInt(RD/2+1);
        if(RD>9){
            RS2=RD;
            concierte_hex();
           
        }else{
        risc=risc+RD;
        }
    opcode="b3";
    }    
   
}
risc=risc+opcode;
}
if(ins=="sd" || ins=="ld"){
    var aux2;
    z=x[1].split("(");
    ind=parseInt(z[0]);
    aux2=ind;
    ind=ind.toString(16);
    var aux;
    console.log(aux2);
    aux=parseInt(ind[1],16);
    a=z[1].split(")");
    if(ins=="ld"){
        if(aux2<256){
            risc="0";
            risc=risc+ind;
        }else{
            risc=ind;
        }
        rs1=a[0].split("x");
        RS1=parseInt(rs1[1]);
       
     CON_RS2();
     if(RD>31 || RS1>31){
        alert("Overflow");
    }else{
        if(RD%2==0){
        
            if(RD/2>9){
                RD=RD/2;
                RS2=RD;
                concierte_hex();
            }else{
                risc=risc+RD/2;
            }
             
        }else{
            RD=RD-parseInt(RD/2+1);
            if(RD>9){
                RS2=RD;
                concierte_hex();
               
            }else{
            risc=risc+RD;
            }
        opcode="83";
        }    
       
    }
    }else if(ins=="sd"){
    rs1=a[0].split('x');
    RS1=rs1[1];
  
    RS2=RD;
    if(RS2>15){
        if(aux%2==0){
            aux=aux+1;
        }
        aux=aux.toString(16)
        risc=ind[0]+aux+RS2;
    }else{
        if(aux%2!=0){
            aux=aux-1;
            
        }
        aux=aux.toString(16)
        risc=ind[0]+aux+RS2;
    }
    CON_RS2();
 
    aux=parseInt(ind[2],16);
    if(aux%2==0){
        
        opcode="23";  
    }else{

        opcode="A4"; 
    }
    aux=aux/2;
    risc=risc+aux;
    }

risc=risc+opcode;
}
console.log(risc);