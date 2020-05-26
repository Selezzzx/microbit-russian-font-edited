
/**
 * Functions to operate with russian font.
 */
//% weight=100 color=#12bcf1 icon="♥"
namespace RussianFont {
     let letters = [" ", "0", "!", "4198532", ".", "4194304", ",", "4456448", "?", "4207150",
        "♥", "4685802", "ⱽ", "11417767", "🦉", "11417767", "☺", "15237440", "☻", "18284864",
        "А", "9747750", "Б", "7642151", "В", "7642407", "Г", "1082415", "Д", "18852164",
        "Е", "15768623", "Ё", "15768623", "Ж", "22483413", "З", "7608583", "И", "18470705",
        "Й", "18470709", "К", "9604265", "Л", "18163844", "М", "18405233", "Н", "9747753",
        "О", "6595878", "П", "9741615", "Р", "1088807", "С", "14713902", "Т", "4329631",
        "У", "1118545", "Ф", "4675012", "Х", "18157905", "Ц", "17769769", "Ч", "8665385",
        "Ш", "32167601", "Щ", "17782449", "Ъ", "6625347", "Ы", "20631089", "Ь", "6625346",
        "Э", "7616775", "Ю", "10149545", "Я", "18444892",
        "а", "9747750", "б", "7642151", "в", "7642407", "г", "1082415", "д", "18852164",
        "е", "15768623", "ё", "15768623", "ж", "22483413", "з", "7608583", "и", "18470705",
        "й", "18470709", "к", "9604265", "л", "18163844", "м", "18405233", "н", "9747753",
        "о", "6595878", "п", "9741615", "р", "1088807", "с", "14713902", "т", "4329631",
        "у", "1118545", "ф", "4675012", "х", "18157905", "ц", "17769769", "ч", "8665385",
        "ш", "32167601", "щ", "17782449", "ъ", "6625347", "ы", "20631089", "ь", "6625346",
        "э", "7616775", "ю", "10149545", "я", "18444892",
        "A", "9747750", "B", "7642407", "C", "14713902", "E", "15768623", "H", "9747753", 
        "K", "9604265", "M", "18405233", "O", "6595878", "P", "1088807", "T", "4329631", 
        "X", "18157905",
        "a", "9747750", "b", "7642407", "c", "14713902", "e", "15768623", "h", "9747753",
        "k", "9604265", "m", "18405233", "o", "6595878", "p", "1088807", "t", "4329631",
        "x", "18157905"  ]

    /**
     * Показываем битовую маску с нужной яркостью
     * @param mask битовая маска
     * @param br яркость символа
     * @param back яркость фона
     */
    //% block
    export function showSlide(mask: number, br: number, back: number): void {
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                let k = 2 ** (i + j * 5)
                if ((mask & k) == k) {
                    led.plotBrightness(i, j, br)
                } else if (back >= 0) {
                    led.plotBrightness(i, j, back)
                }
            }
        }
    }

    /**
    * Получить битовую маску символа
    * @param символ
    */
    //% block
    export function getLetterMask(letter: string): number {
        for (let l = 0; l <= letters.length / 2 - 1; l++) {
            if (letter == letters[l * 2]) {
                return parseFloat(letters[1 + l * 2])
            }
        }
        return 4207150; // "?"
    }

    /**
    * Показываем мигающую строку
    * @param message строка символов
    * @param tm сколько мс. показывать каждую букву
    */
    //% block
    export function showMessage(message: string, tm: number): void {
        if (tm <= 10) {
            tm = 10
        }
        for (let index = 0; index <= message.length - 1; index++) {
            let mask = getLetterMask(message.charAt(index))
            blinkLetter(mask, tm)
            basic.pause(0.5 * tm)
        }
    }

    function blinkLetter(mask: number, tm: number) {
        for (let i1 = 0; i1 <= 26; i1++) {
            showSlide(mask, i1 * 8 + 10, 0)
            basic.pause(0.1 * tm)
        }
        for (let i12 = 0; i12 <= 26; i12++) {
            showSlide(mask, 255 - i12 * 8, 0)
            basic.pause(0.4 * tm)
        }
        showSlide(mask, 0, 0)
    }

    /**
    * Показываем мигающую строку
    * @param message строка символов
    * @param tm сколько мс. показывать каждую букву
    */
    //% block
    export function showMessageShadow(message: string, tm: number): void {
        if (tm <= 10) {
            tm = 10
        }
        message = message + " "
        let lastMask = 0
        for (let index = 0; index <= message.length - 1; index++) {
            let mask = getLetterMask(message.charAt(index))
            let shadow = lastMask & (~mask)
            for (let i1 = 0; i1 <= 26; i1++) {
                showSlide(lastMask, 255 - i1 * 8 - 10, -1)
                showSlide(mask, i1 * 8 + 10, -1)
//                basic.pause(0.1 * tm)
            }
            basic.pause(0.5 * tm)
            lastMask = mask
        }
    }
}
