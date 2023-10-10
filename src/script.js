const slider = document.querySelector('.slider')
let sliderValue = slider.value
let initialProgress = (sliderValue / slider.max) * 100

let viewsAmount = document.querySelector('#viewsAmt'),
    price = document.querySelector('#price'),
    toggle = document.querySelector('#toggle'),
    toggleHandle = document.querySelector('.circle');

let applyDiscount = false
let currentPrice = price.innerText

// initial state of the slider
slider.style.background = `linear-gradient(to right, 
    var(--soft-cyan) ${initialProgress}%, 
    var(--lighter-grayish-blue) ${initialProgress}%)`

function updateRangePrgress(val) {
    sliderValue = val
    const progress = (sliderValue / slider.max) * 100

    slider.style.background = `linear-gradient(to right, 
        var(--soft-cyan) ${progress}%, 
        var(--lighter-grayish-blue) ${progress}%)`
}

slider.addEventListener('input', (e) => {
    updateRangePrgress(e.target.value)
})



function toggleDiscount(val) {
    if (applyDiscount === false) {
        toggleHandle.classList.add('toggled')
        applyDiscount = true
        price.innerText = val * 0.75
        return val * 0.75
    } else {
        toggleHandle.classList.remove('toggled')
        applyDiscount = false
        price.innerText = val
        return val
    }
}

// toggleHandle.classList.add('toggled')

// - 10K pageviews / $8 per month
// - 50K pageviews / $12 per month
// - 100K pageviews / $16 per month
// - 500k pageviews / $24 per month
// - 1M pageviews / $36 per month
const data = [
    { value: 1, pageViews: '10k', price: 8 },
    { value: 5, pageViews: '50k', price: 12 },
    { value: 10, pageViews: '100k', price: 16 },
    { value: 50, pageViews: '500k', price: 24 },
    { value: 100, pageViews: '1m', price: 36 }
]

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

const plans = data.map(plan => new Plan({ ...plan }))

toggle.addEventListener('click', () => {

    // if (applyDiscount === false) {
    //     toggleHandle.classList.add('toggled')
    //     applyDiscount = true
    // } else {
    //     toggleHandle.classList.remove('toggled')
    //     applyDiscount = false
    // }
    toggleDiscount(Number(currentPrice))

})

slider.addEventListener('input', (e) => {
    let value = e.target.value

    for (const plan of plans) {
        if (plan.value == value) {
            viewsAmount.innerText = plan.pageViews
            price.innerText = applyDiscount ? plan.price * 0.75 : plan.price
            currentPrice = plan.price
        }
    }
})
