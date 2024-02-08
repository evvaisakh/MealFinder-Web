const searchMeal = async (e) => {
    e.preventDefault()

    const input = document.querySelector('.input')
    const image = document.querySelector('img')
    const title = document.querySelector('.title')
    const info = document.querySelector('.info')
    const ingredientsOut = document.querySelector('.ingredients')

    const showMealInfo = (meal) => {
        const { strMeal, strInstructions } = meal
        title.textContent = strMeal
        image.src = meal.strMealThumb
        info.textContent = strInstructions

        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
            } else {
                break
            }
        }
        ingredientsOut.innerHTML = `<span class="text-capitalize">${ingredients.map((ing) => `<li class="ing">${ing}</li>`).join("")}</span>`
    }

    const fetchMealData = async (val) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
        const { meals } = await response.json()
        return meals
    }
    const val = input.value.trim()
    input.value = ''
    if (val) {
        const meals = await fetchMealData(val)
        if (!meals) {
            alert('Meal not found :(')
        }
        meals.forEach(showMealInfo);
    } else {
        alert('Please try searching for meal :)')
    }
}

const form = document.querySelector('form')
form.addEventListener("submit", searchMeal)
const magnify = document.querySelector('.magnify')
magnify.addEventListener("click", searchMeal)
