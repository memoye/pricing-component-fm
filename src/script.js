// grab dynamic elements   
const slider = document.querySelector('.slider')
let sliderValue = slider.value
let initialProgress = (sliderValue / slider.max) * 100

let viewsAmount = document.querySelector('#viewsAmt'),
    price = document.querySelector('#price'),
    toggle = document.querySelector('#toggle'),
    toggleHandle = document.querySelector('.circle');

let applyDiscount = false
let currentPrice = price.innerText

// class for constructing subscription plan variations
class Plan {
    constructor({ value, pageViews, price }) {
        this.value = value
        this.pageViews = pageViews
        this.price = price
    }

    // method to update value
    update(key, value) {
        this[key] = value
    }
}

// provided data
const data = [
    { value: 1, pageViews: '10k', price: 8 },
    { value: 5, pageViews: '50k', price: 12 },
    { value: 10, pageViews: '100k', price: 16 },
    { value: 50, pageViews: '500k', price: 24 },
    { value: 100, pageViews: '1m', price: 36 }
]

// initial state of the slider
slider.style.background = `linear-gradient(to right, 
    var(--soft-cyan) ${initialProgress}%, 
    var(--lighter-grayish-blue) ${initialProgress}%)`

// handle slider behavior
function updateRangePrgress(val) {
    sliderValue = val
    const progress = (sliderValue / slider.max) * 100

    slider.style.background = `linear-gradient(to right, 
        var(--soft-cyan) ${progress}%, 
        var(--lighter-grayish-blue) ${progress}%)`
}

// handle discount toggle and update ui with current price
function toggleDiscount(val) {
    toggleHandle.classList.toggle('toggled')
    toggleHandle.classList.toggle('handleToggled')  //for firefox
    // toggle.classList.toggle('toggledFF')
    if (applyDiscount === false) {
        applyDiscount = true
        price.innerText = (val * 0.75).toFixed(2)
    } else {
        // toggleHandle.classList.remove('toggled')
        applyDiscount = false
        price.innerText = (val).toFixed(2)
    }
}

// handle plan selection and update ui with current plan
function updatePlan(e) {
    let value = e.target.value
    viewsAmount.innerText = numFormatter(value * 10000)

    for (const plan of plans) {
        if (plan.value <= value) {
            price.innerText = applyDiscount ? (plan.price * 0.75).toFixed(2) : (plan.price).toFixed(2)
            currentPrice = plan.price
        }
    }
}

// converts number to string representation with K and M.
function numFormatter(num) {
    if (num >= 1000000) {
        const result = (num / 1000000).toFixed(1);
        return result.endsWith('.0') ? result.slice(0, -2) + 'M' : result + 'M';
    } else if (num >= 1000) {
        const result = (num / 1000).toFixed(1);
        return result.endsWith('.0') ? result.slice(0, -2) + 'K' : result + 'K';
    } else {
        return num.toString();
    }
}

const plans = data.map(plan => new Plan({ ...plan }))

toggle.addEventListener('click', () => {
    toggleDiscount(Number(currentPrice))
})

slider.addEventListener('input', e => {
    updateRangePrgress(e.target.value)
    updatePlan(e)
})
