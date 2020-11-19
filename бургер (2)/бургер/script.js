// создаем объект с продуктами

const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}
// Создаем доп объект с модификациями

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = receipt.querySelector('.receipt__window-out'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    btnReceipt = receipt.querySelector('.receipt__window-btn');

// Перебираем все кнопки (+ и -)
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        // если было нажата кнопка + или - то отправляем к
        plusOrMinus(this);
      
    })
}
function plusOrMinus(element) {
    // closest() - метод объекта, подключается к родителю
    // getAttribute() - Берет информацию с атрибута
    
    const parent = element.closest('.main__product'), // подключаемся к родителю
        parentId = parent.getAttribute('id'), //берет у родителя атрибут id
        out = parent.querySelector('.main__product-num'),// подключаемся от родителя к количеству
        price = parent.querySelector('.main__product-price span'),// подключаемся к цене
        kcall = parent.querySelector('.main__product-kcall span'), // подключаемся к колориям
        elemntData = element.getAttribute('data-symbol');// берем значение кнопки + или -

    if (elemntData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elemntData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }
    console.log(product[parentId].amount);
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;

    console.log(product[parentId]);

}

for (let i = 0; i < checkExtraProduct.length; i++) {
    //цикл пробегается по всем кнопкам добавок
    checkExtraProduct[i].addEventListener('click',function() {
        // на какой инпут было нажатие
        addExtraProduct(this);
    })
    
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
          parentId = parent.getAttribute('id'),
          kcall = parent.querySelector('.main__product-kcall span'),
          price = parent.querySelector('.main__product-price span'),  
          elAtr = element.getAttribute('data-extra');

          product[parentId][elAtr] = element.checked;

          if (product[parentId][elAtr] == true) {
              product[parentId].kcall += extraProduct[elAtr].kcall
              product[parentId].price += extraProduct[elAtr].price
          }else{
              product[parentId].kcall -= extraProduct[elAtr].kcall
              product[parentId].price -= extraProduct[elAtr].price
          }

          kcall.innerHTML = product[parentId].Kcall;
          price.innerHTML = product[parentId].Summ;
    
}
    let   arrayProduct = [],
          totalName  = '',
          totalPrice = 0,
          totalKcall = 0;
          addCart.addEventListener('click' , function (){


for (const key in product) {
            const po = product[key];
            if (po.amount > 0) {
                arrayProduct.push(po);
                for (const infokey in po) {
                    if (po[infokey] === true) {
                        po.name += '\n' + extraProduct[infokey].name
                    }
                }
            
            }
            po.price = po.Summ;
           po.Kcall = po.Kcall;
          }
           for (let i = 0; i < arrayProduct.length; i++) {
             const el = arrayProduct[i];
             totalPrice += el.price;
             totalKcall += el.Kcall;
             totalName += '\n' + `${i+1}` + ')' + el.name  + '\n' + `  количество: ${el.amount}` + '\n';      
               
           }
           receiptOut.innerHTML = `Вы купили: \n ${totalName}  \n Калорийность: ${totalKcall} \n Стоимость покупки: ${totalPrice} сумм`;
           receipt.style.display = 'flex';

           setTimeout(function () { 
            receipt.style.opacity = '1';
            },100);
            setTimeout(function () {
                receiptWindow.style.top = '0';
              },200);
              document.body.style.overflow = 'hidden';
          const outNum = document.querySelectorAll('.main__product-num');
          for (let i = 0; i < outNum.length; i++) {
              outNum[i].innerHTML = 0;
              
          }
             const outPrice = document.querySelectorAll('.main__product-price span');
             for (let i = 0; i < outPrice.length; i++) {
                outPrice[i].innerHTML = 0;
                 
             }
             const outKcall = document.querySelectorAll('.main__product-kcall span');
             for (let i = 0; i < outKcall.length; i++) {
                outKcall[i].innerHTML = 0;
                 
             }
             

            });
            btnReceipt.addEventListener('click', function () { 
                location.reload()
             })
          


             const lvl = document.querySelector('.header__timer-extra');
             let speed = 20;
              
             function LVL(i = 0) {
                 lvl.innerHTML = i;
                 i++
                 if (i > 50 && i < 75) {
                     speed = 80
                 }else if (i > 74 && i < 85){
                     speed = 120;
                 }else if (i > 84 && i < 95){
                     speed = 180;
                 }else if (i > 94){
                     speed = 250;
                 }

                 if (i <=100){
                     setTimeout(()=> LVL(i),speed);
                 }
               }
               LVL();



               const productImg = document.querySelector('.main__product-preview'),
                     productId = document.setAttribute('id active');
                     viwImg = document.querySelector('.view');
                     productImg.addEventListener('dbclick', function(){
                      if (viwImg == 'active') {
                          viwImgclassList.add('active');
                      }
                      
                     })
                     setTimeout(function(){
                        viwImg.style.display = 'flex';
                     },200); 
                     main__product-info