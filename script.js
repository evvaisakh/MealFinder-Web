const API_KEY = "4dbc17e007ab436fb66416009dfb59a8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"))

function reload() {
    window.location.reload()
}

function redirectTo() {
    window.location = "weather.html"
}

const fetchNews = async (query) => {
    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
        const data = await response.json()
        bindData(data.articles)
        function bindData(articles) {
            const cardsContainer = document.getElementById('cards-container')
            const newsCardTemplate = document.getElementById('template-news-card')

            cardsContainer.innerHTML = ''

            articles.forEach(article => {
                if (!article.urlToImage) return
                const cardClone = newsCardTemplate.content.cloneNode(true)
                fillDataInCard(cardClone, article)
                cardsContainer.appendChild(cardClone)
            })
        }
        function fillDataInCard(cardClone, article) {
            const newsImg = cardClone.querySelector('#news-img')
            const newsTitle = cardClone.querySelector('#news-title')
            const newsSource = cardClone.querySelector('#news-source')
            const newsDesc = cardClone.querySelector('#news-desc')
            const newsBtn = cardClone.querySelector('#news-btn')
            newsImg.src = article.urlToImage
            newsTitle.innerHTML = article.title
            newsDesc.innerHTML = article.description
            newsBtn.href = article.url

            const date = new Date(article.publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            })
            newsSource.innerHTML = `${article.source.name} : ${date}`
        }
        const searchButton = document.getElementById("search-btn")
        const searchText = document.getElementById("search-text")
        searchButton.addEventListener("click", () => {
            const query = searchText.value
            if (!query) return
            fetchNews(query)
            searchText.value = ""
            curSelectedNav?.classList.remove("active")
            curSelectedNav = null
        })
    } catch (err) {
        console.log(err);
    }
}
let curSelectedNav = null
function onNavItemClick(id) {
    fetchNews(id)
    const navItem = document.getElementById(id)
    curSelectedNav?.classList.remove("active")
    curSelectedNav = navItem
    curSelectedNav.classList.add("active")
}
