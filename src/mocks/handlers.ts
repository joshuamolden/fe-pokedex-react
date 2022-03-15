import { rest } from "msw";
import { API_POKEMON_PATH } from "../services/apiConstants";
import { pokemonListMock } from "../__fixtures__/pokemon";

/* 
    I set up Mock Service Worker (MSW) environment for testing. This was done by 
    integrating with Node (https://mswjs.io/docs/getting-started/integrate/node).
    What this means is that the tests would be able to make api requests
    and MSW would intercept them and return based on the defined "response" methods.
    I didn't "really" set up the handlers for it, but you get the point.

    In order to set up MSW to work on the browser, you would have to set up a worker
    by first integrating with the browser (https://mswjs.io/docs/getting-started/integrate/browser)
    and then setting up a worker (https://mswjs.io/docs/getting-started/integrate/browser#configure-worker)
*/

export const handlers = [
  // GET list of pokemon (paginated)
  rest.get(`${API_POKEMON_PATH}/`, (request, response, context) => {
    return response(context.status(200), context.json(pokemonListMock));
  }),
];
