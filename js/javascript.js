/* Масив з ідентифікаторами кнопок */
let buttons = ["upper-case", "lower-case", "proper-case", "sentence-case", "save-text-file"];

/* Цикл для застостосування масиву, до стилізації та функціоналу кнопок */
for (let key in buttons){
    let but = document.getElementById(buttons[key]);    /* Надання змінній ідентифікатор кнопки */

    /* Функція, коли відпускаємо праву клавішу миші, при натисканні кнопки, за певним ідентифікатором */
    but.addEventListener("mouseup", function (){
        let b_style = document.getElementById(buttons[key]);
        b_style.style.backgroundColor = "#ffb703";      /* Фоновий колір кнопки */
        b_style.style.color = "#e63946";                /* Колір тексту */
    });

    /* Аналогічно, тільки навпаки, функція, коли натискаємо праву клавішу мишу і тримаємо, на певний кнопці */
    but.addEventListener("mousedown", function (){
        let b_style = document.getElementById(buttons[key]);
        b_style.style.backgroundColor = "#cdb4db";      /* Зміна фонового кольору кнопки */
        b_style.style.color = "black";                  /* Зміна кольору тексту кнопки */
    });

    /* Окрема функція, при кліку на певну кнопку */
    but.addEventListener("click", function (){
        let area;
        /* Якщо ідентифікатор з масиву, дорівнюю upper-case, то переводимо весь текст в верхній регістр */
        if(buttons[key] === "upper-case") {
            area = document.querySelector("textarea").value.toUpperCase().split(' ');
            document.querySelector("textarea").value = area.join(' ');
        }
        /* Інакше, якщо ідентифікатор дорівнює lower-case, то переводимо в нижній регістр */
        else if (buttons[key] === "lower-case"){
            area = document.querySelector("textarea").value.toLowerCase().split(' ');
            document.querySelector("textarea").value = area.join(' ');
        }
        /* Переводимо в регістр, де кожне слово з великої літери */
        else if (buttons[key] === "proper-case"){
            area = document.querySelector("textarea").value.split(' ').map(word =>
                word[0].toUpperCase() + word.substring(1).toLowerCase());
            document.querySelector("textarea").value = area.join(' ');
        }
        /* Звичайний регістр, в котрому кожне речення починається з великої літери */
        else if (buttons[key] === "sentence-case"){
            area = document.querySelector("textarea").value.toLowerCase();
            document.querySelector("textarea").value = area.replace(/^.|\.\s+\b\w/g, w => w.toUpperCase());
        }
    });
}

/* Окрема обробка кліку на кнопку з ідентифікатором save-text-file для завантаження текстового файлу*/
document.getElementById("save-text-file").addEventListener("click", function (){
    let area = document.querySelector("textarea").value;
    let filename = "text.txt";
    /* Використання функції, що завантажує файл з текстом від textarea, та назвою text.txt */
    download(filename, area);
}, false);

/* Ось і функція, що приймає ім'я файлу та сам текст */
function download(filename, text){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,'+
    encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}