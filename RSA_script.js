/*
0 : 입력안됨
1 : 소수
2 : 수 아님
3 : 소수 아님
*/
let is_p = 0, is_q = 0, p, q, e, d, n, phi_n, digits;
let tester = [];

function min(a, b) {
  if(a <= b) return a;
  return b;
}

function isPrime(a) {
  if(a < 1373653) tester = [2, 3];
  else if(a < 9080191) tester = [31, 73];
  else if(a < 4759123141) tester = [2, 7, 61];
  else if(a < 2152302898747) tester = [2, 3, 5, 7, 11];
  else if(a < 3474749660383) tester = [2, 3, 5, 7, 11, 13];
  else tester = [2, 3, 5, 7, 11, 13, 17];
  return 1;
}

function find_d() {
  let i = e+1;
  while(1) {
    if((i*e) % phi_n == 1) return i;  
    i++;
  }
}

function get_digits(a) {
  digits = 0;
  let cnt = 1;
  while(a >= cnt) {
    cnt *= 2;
    digits++;
  }
  digits = min(8, digits);
}

function is_n_phi_changed() {
  if(is_p == 1 && is_q == 1) {
    document.getElementById("n").innerText = p*q;
    document.getElementById("phi").innerText = (p-1)*(q-1);
    n = p*q;
    get_digits(n);
    phi_n = (p-1)*(q-1);
    e = phi_n-1;
    d = find_d();
    document.getElementById("e").innerText = e;
    document.getElementById("d").innerText = d;
    document.getElementsByTagName("table")[0].style.margin = "0 auto 0 auto";
  } else {
    document.getElementById("n").innerText = "";
    document.getElementById("phi").innerText = "";
    document.getElementById("e").innerText = "";
    document.getElementById("d").innerText = "";
    document.getElementsByTagName("table")[0].style.margin = "0 0 0 31%";
  }
}

function P_Changed() {
  let now = document.getElementById('p').value;
  let prt;
  if(now == '') {
    is_p = 0;
    prt = "p값을 입력해주세요.";
  } else if(isNaN(now)) {
    is_p = 2;
    prt = "입력된 p의 값이 자연수가 아닙니다";
  } else if(!isPrime(now)) {
    is_p = 3;
    prt = "입력된 p의 값이 소수가 아닙니다";
  } else {
    is_p = 1;
    p = now;
    prt = 'p : ';
  }
  is_n_phi_changed();
  document.getElementById("p_out").innerText = prt;
}

function Q_Changed() {
  let now = document.getElementById('q').value;
  let prt;
  if(now == '') {
    is_q = 0;
    prt = "q값을 입력해주세요.";
  } else if(isNaN(now)) {
    is_q = 2;
    prt = "입력된 q의 값이 자연수가 아닙니다";
  } else if(!isPrime(now)) {
    is_q = 3;
    prt = "입력된 q의 값이 소수가 아닙니다";
  } else {
    is_q = 1;
    q = now;
    prt = 'q : ';
  }
  is_n_phi_changed();
  document.getElementById("q_out").innerText = prt;
}

function encode(str) {
  let tot = 1;
  for(let i = 0; i < e; i++) {
    tot *= str;
    tot %= n;
  }
  document.getElementById('encode_output').value = tot;
}

function decode(str) {
  let tot = 1;
  for(let i = 0; i < d; i++) {
    tot *= str;
    tot %= n;
  }
  document.getElementById('decode_output').value = tot;
}

window.onload=function() {
  document.getElementById('encode').onclick=function () {
    encode(document.getElementById('encode_input').value);
  };
  document.getElementById('decode').onclick=function () {
    decode(document.getElementById('decode_input').value);
  };
}