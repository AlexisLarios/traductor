 
function Convierte(){
    
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
   
var instruc = document.getElementById("instruccion").value;
var etiq;
var saltos=[];
var n;
var y;
var z;
var a;
var rs1;
var rs2;
var RS1;
var RS2;
var i;
var rd;
var inme;
var opcode=33;
var ins;
var RD;
var risc;
var ind;

instruc=instruc.split("\n");
n=instruc.length;
for(i=0; i<n; i++){
   /* etiq=instruc[i].split(":");
    if(instruc[i][0]!="s" || instruc[i][0]!="a" || instruc[i][0]!="j" || instruc[i][0]!="b"){
        x=etiq[1];
        saltos[i]=etiq[0];
    }else{
     
    }
    console.log(etiq);*/
    x=instruc[i];
    console.log(instruc[i]);
    x=x.split(",");
   
    y=x[0].split(" ");
  
    ins=y[0];
    rd=(y[1].split("x"));
    RD=parseInt(rd[1]);


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
}else if(ins=="beq" || ins=="bne"){
    var divi;
    rs2=x[1].split("x");
    RS2=rs2[1];
    inme=parseInt(x[2]);
    if(inme%2==0){
        opcode="63"
    }else{
        opcode="e3"
    }

    if(inme>31){
        divi=inme.toString(16);
       
        if(inme<127){
            risc="0";
        }
       
        if(RS2>15){
            if(divi[0]%2==0){
                risc=risc+divi[0]+1;
            }else{
                risc=risc+divi[0];
            }
            
        }else{
            if(divi[0]%2==0){
                risc=risc+divi[0];
            }else{
                risc=risc+(divi[0]-1);
            }
         
        }
       
        risc=risc+RS2;
       
        
    }else if(inme<31){
        if(RS2>15){
            risc="01"
        }else{
            risc="00";
        }
       risc=risc+RS2;
        
    }
    rs1=y[1].split("x");
    RS1=rs1[1];
    if(parseInt(RS1)%2!=0){
        risc=risc+parseInt(RS1/2);
        if(ins=="beq"){
            risc=risc+"8";
        }else{
            risc=risc+"9";
        }
        
    }else{
        risc=risc+RS1/2;
        if(ins=="beq"){
            risc=risc+"0";
        }else{
            risc=risc+"1";
        }
    }

    if(inme>31){
        if(parseInt(divi[0])%2==0){
            risc=risc+parseInt(divi[1]/2).toString(16);
        }else{
            var aux;
            aux=parseInt(divi[1])+8;
            risc=risc+(aux).toString(16);

        }
        
    }else{
        risc=risc+parseInt(inme/2);
    }
    
    risc=risc+opcode;
}else if(ins=="jal"){
    ind=x[1].split(" ");
    inme=ind[1].toString(16);
    rd=y[1].split("x");
    RD=rd[1];
    if(inme>15){
        risc="000";
        RS2=parseInt(inme);
        concierte_hex(); 
    }else{
        risc="0000";
        RS2=parseInt(inme);
        concierte_hex(); 
    }
    if(parseInt(RD)%2==0){
        risc=risc+RD/2+"6f";
    }else{
        risc=risc+parseInt(RD/2)+"ef";
    }

}else if(ins="jalr"){
    ind=x[1].split("(");
    inme=parseInt(ind[0]);
    z=ind[1].split(")");
    rs1=z[0].split("x");
    RS1=parseInt(rs1[1]);
    rd=y[1].split("x");
    RD=parseInt(rd[1]);
    
    if(inme>15){
        risc="0"+inme.toString(16);
    }else{
        risc="00"+inme.toString(16);
    }
    if(RS1%2==0){
        risc=risc+parseInt(RS1/2).toString(16)+"0";
    }else{
        risc=risc+parseInt(RS1/2).toString(16)+"8";
    }
    if(RD%2==0){
        risc=risc+parseInt(RD/2).toString(16)+"67"
    }else{
        risc=risc+parseInt(RD/2).toString(16)+"e7"
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
}
}

