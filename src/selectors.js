export const getArticleById = (state, id) => state.articles[id];

export const getArticles = (state, ownProps) => {
  const activeCategoryId = getActiveCategoryId(ownProps);
  return state.articlesPage.ids
    .map(id => getArticleById(state, id))
    .filter(article => article.name.includes(state.articlesPage.search))
    .filter(article =>
      activeCategoryId ? article.categoryId === activeCategoryId : true
    );
};

export const getRenderedArticlesLength = state => state.articlesPage.ids.length;

export const getTotalBasketCount = state => state.basket.length;

export const getTotalBasketPrice = state => {
  const totalPrice = state.basket.reduce((sum, id) => {
    return (sum += +getArticleById(state, id).price);
  }, 0);
  return totalPrice.toFixed(2);
};

export const getCategories = state => Object.values(state.categories);

//  Avoid "Cannot read property of undefined"
export const getSafe = fn => {
  try {
    return fn();
  } catch (e) {
    return undefined;
  }
};

export const getActiveCategoryId = ownProps =>
  getSafe(() => ownProps.match.params.id);

export const getBasketArticlesWithCount = state => {
  // basketArticleId => count
  const getCount = id => state.basket.filter(baskId => baskId === id).length;

  return state.basket
    .filter((id, ind, arr) => arr.indexOf(id) === ind) // -> unique ids
    .map(id => getArticleById(state, id)) // ids -> articles
    .map(article => ({ ...article, count: getCount(article.id) })); // -> w/count
};

export const getBrands = state => Object.values(state.brands);
