// write a program to check num is prime or odd 
function isPrime(num: number): boolean {
    if(num<=1){
        return false;
    }
    if(num===2){
          return true;
    }

    if(num%2===0){
        return false;
    }

   const sqrtNum=Math.sqrt(num);
   for(let i=3;i<=sqrtNum;i+=2){
    if(num%i===0){
        return false;
    }
   }
   return true;
}

const check=29;
if(isPrime(check)){
    console.log(`${check} is a prime number.`);
}else{
    console.log(`${check} is not a prime number.`)
}