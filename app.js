const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => { return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) })

  if (restaurants.length === 0) {
    res.render('error', { keyword: keyword })
  } else { res.render('index', { restaurants: restaurants, keyword: keyword }) }

})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
app.get('/category/:restaurant_category', (req, res) => {
  const restaurantCategory = restaurantList.results.filter(restaurant => { return restaurant.category === req.params.restaurant_category })
  res.render('index', { restaurants: restaurantCategory })
})
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
