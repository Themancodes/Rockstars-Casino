const createCardCorner = (number, symbol) => {
    return `<div class="card-corner">
  <div>${number}</div>
  <div>${symbol}</div>
  </div>`
}

const createCardSymbols = (number, symbol) => {
        let symbols = ''
        const isNumber = !isNaN(number);

        if (number === 'A') {
            symbols = (`<div>${symbol}</div>`)
        }

        if (['J', 'Q', 'K'].includes(number)) {
            symbols = (`<div class="image"></div>`)
        }

        if (isNumber) {
            symbols = `${new Array(parseInt(number))
              .fill(symbol)
              .map((cardSymbol) => `
                <div>${cardSymbol}</div>
              `)
              .join('')
              }`
            }
            return `<div class="symbols">${symbols}</div>`
}

const createCardFront = (content) => {
    return `<div class="front">${ content }</div>`;
}

const createCardBack = () => {
    return `<div class="back"></div>`
}

const createCardDiv = (attributes) => {
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card')
    Object.entries(attributes).forEach(([key, value]) => {
      cardDiv.setAttribute(key, value)
    })

    return cardDiv
}

const createCard = (card, flipped) => {
  const number = card.slice(0, -1);
  const symbol = card.slice(-1);
  const cardDiv = createCardDiv({symbol, number})
        
  cardDiv.innerHTML = `
    <div class="container">
      ${createCardFront(`
        ${createCardCorner(number, symbol)}
        ${createCardSymbols(number, symbol)}
        ${createCardCorner(number, symbol)}
      `)}
      ${createCardBack()}
  </div>
  `;

  cardDiv.addEventListener('click', () => {
    if (cardDiv.classList.contains('flipped')) {
      cardDiv.classList.remove('flipped');
    } else {
      cardDiv.classList.add('flipped');
    }
  })

  if (flipped) {
    cardDiv.classList.add('flipped');
  }


return cardDiv;
}

const createDeck = async ({selector, path, flipped}) => {
  const container = document.querySelector(selector);
  const cards = await (await fetch(path)).json();
  cards.forEach((card, index) => container.append(createCard(card, (index < flipped))))
}

const onClickElementByID = (id, callback) => {
  document.getElementById(id).addEventListener('click', callback)
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
    });

    document.getElementById('flip-cards').addEventListener('click', () => {

      document.querySelectorAll('.deck.hand .card').forEach((element) => {
        element.classList.remove('flipped');
      })

    })

    
  })()

})




const postRequest = (body) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

onClickElementByID('flip-cards', () => {
  document.querySelectorAll('.deck.hand .card')
    .forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('flipped')
      }, (300 * (index)))
    })
})



('button-user-name', async () => {
  const { value } = document.getElementById('user-name');
  const userResponse = await (await fetch('/set-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: value
    })
  })).json();
  console.log('response', userResponse)
})