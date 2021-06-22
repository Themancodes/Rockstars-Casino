const createCardCorner = (number, symbol) => {
    return `<div class="card-corner top-left">
  <div>${number}</div>
  <div>${symbol}</div>
  </div>`
}

const createCardSymbols = (number, symbol) => {
        const isNumber = !isNaN(number);
        return `<div class="symbols">
  ${(isNumber) ? `${new Array(parseInt(number))
  .fill(symbol)
  .map((cardSymbol) => `
  <div>${cardSymbol}</div>
  `)
  .join('')
  }` : ''}
  </div>
  `
}


const createCardFront = (content) => {
  return `<div class="front">${content}</div>`;
}

// const createCardFront = (number, symbol) => {
//     return `<div class="front">
//       ${createCardCorner(number, symbol)}
//       ${createCardSymbols(number, symbol)}
//       ${createCardCorner(number, symbol)}
//     </div>`;
// }

const createCardBack = () => {
    return `<div class="back"></div>`
}

const createCardDiv = (attributes) => {
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card')
    cardDiv.setAttribute('symbol', attributes.symbol)
    cardDiv.setAttribute('number', attributes.number)
    return cardDiv
}

const createCard = (number, symbol) => {

        const isNumber = !isNaN(attributes.number);
        cardDiv.innerHTML = `
  <div class="card-corner top-left">
  <div>${number}</div>
  <div>${symbol}</div>
  </div>
  
  <div class="symbols">
  ${(isNumber) ? `${new Array(parseInt(number))
  .fill(symbol)
  .map((cardSymbol) => `
  <div>${cardSymbol}</div>
  `)
  .join('')
  }` : ''}
  </div>

  <div class="card-corner bottom-right">
  <div>${number}</div>
  <div>${symbol}</div>
  </div>
  <div class="back"></div>
  `;

  cardDiv.addEventListener('click', () => {
    if (cardDiv.classList.contains('flipped')) {
      cardDiv.classList.remove('flipped');
    } else {
      cardDiv.classList.add('flipped');
    }
  })
return cardDiv;
}



(async () => {
    const deck = await (await fetch('/table')).json();
    const container = document.querySelector('.deck.hand');
    console.log(deck)

    deck.forEach((card) => {
        const number = card.slice(0, -1);
        const symbol = card.slice(-1);

        container.append(createCard(number, symbol))
    });
})();

const createDeck = async ({selector, path, flipped}) => {
  container = document.querySelector(selector);
  cards = await (await fetch(path)).json();
}

window.addEventListener('load', () => {
  (async () => {
    await createDeck({
      selector: '.deck.table',
      path: '/table',
      flipped: 2
    });

    const cardSize = 2;
    await createDeck({
      selector: '.deck.hand',
      path: `/deck/${cardSize}`,
      flipped: cardSize     
    })
    
  })()

})